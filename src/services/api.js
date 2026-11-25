const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
export class ApiError extends Error {
  constructor(message, options = {}) { super(message); this.name='ApiError'; this.status=options.status||0; this.code=options.code||'UNKNOWN_ERROR'; this.details=options.details||null; this.requestId=options.requestId||null }
}
export const getAccessToken=()=>localStorage.getItem('forma_access_token')
export const saveAccessToken=token=>token&&localStorage.setItem('forma_access_token',token)
export const clearAccessToken=()=>localStorage.removeItem('forma_access_token')
export async function apiRequest(path,options={}) {
  const headers=new Headers(options.headers||{}); headers.set('Accept','application/json')
  if(options.body&&!(options.body instanceof FormData))headers.set('Content-Type','application/json')
  const token=getAccessToken(); if(token)headers.set('Authorization',`Bearer ${token}`)
  let response
  try{response=await fetch(`${API_URL}${path}`,{...options,headers})}catch{throw new ApiError('Impossible de joindre le serveur. Vérifiez que votre API est démarrée.',{code:'NETWORK_ERROR'})}
  const payload=await response.json().catch(()=>null)
  if(!response.ok||payload?.success===false)throw new ApiError(payload?.error?.message||'Une erreur est survenue.',{status:response.status,code:payload?.error?.code,details:payload?.error?.details,requestId:payload?.request_id})
  return payload
}
export const authApi={
  // Les chemins et réponses d'authentification restent à confirmer dans OpenAPI.
  login:data=>apiRequest('/auth/login',{method:'POST',body:JSON.stringify(data)}),
  register:data=>apiRequest('/auth/register',{method:'POST',body:JSON.stringify(data)}),
}
export const coursesApi={
  list:params=>{const q=new URLSearchParams();Object.entries(params||{}).forEach(([k,v])=>{if(v!==''&&v!==undefined&&v!==null)q.set(k,v)});return apiRequest(`/courses${q.size?`?${q}`:''}`)},
  detail:id=>apiRequest(`/courses/${id}`),
  mine:()=>apiRequest('/courses/mine'),
  create:data=>apiRequest('/courses',{method:'POST',body:JSON.stringify(data)}),
  enroll:id=>apiRequest(`/courses/${id}/enroll',{method:'POST',body:JSON.stringify({})}),
}
export const enrollmentsApi={mine:()=>apiRequest('/enrollments/me')}
