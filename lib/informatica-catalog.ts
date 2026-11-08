export type CatalogProduct = {
  id:number; sku:string; name:string; slug:string; model:string|null; description:string|null;
  price:number|null; availability:"available"|"on_request"|"unavailable";
  category:{name:string;slug:string}; brand:{name:string;slug:string}|null;
  images:{url:string;alt:string}[];
};
export type CatalogCategory={id:number;parent_id:number|null;name:string;slug:string};
type PageResponse={data:CatalogProduct[];meta:{current_page:number;per_page:number;last_page:number;total:number}};
const endpoint=process.env.K7_GESTAO_LEAD_URL||"https://gestao.k7sites.com.br/api/site/leads";
async function request<T>(path:string):Promise<T|null>{
  const token=process.env.K7_GESTAO_LEAD_TOKEN;
  if(!token)return null;
  try{
    const base=new URL("/api/v1/catalog/",endpoint);
    const url=new URL(path,base);
    const res=await fetch(url,{headers:{Authorization:`Bearer ${token}`,Accept:"application/json"},cache:"no-store",signal:AbortSignal.timeout(6000)});
    if(!res.ok)return null;
    return await res.json() as T;
  }catch{return null;}
}
export async function catalogProducts(params:Record<string,string|undefined>={}):Promise<PageResponse|null>{
  const q=new URLSearchParams();
  for(const [k,v] of Object.entries(params))if(v)q.set(k,v);
  return request<PageResponse>(`products?${q.toString()}`);
}
export async function catalogCategories():Promise<CatalogCategory[]>{
  const data=await request<{data:CatalogCategory[]}>("categories");
  return Array.isArray(data?.data)?data.data:[];
}
export async function catalogProduct(slug:string):Promise<CatalogProduct|null>{
  const data=await request<{data:CatalogProduct}>(`products/${encodeURIComponent(slug)}`);
  return data?.data??null;
}
