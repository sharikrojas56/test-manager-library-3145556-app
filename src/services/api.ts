import axios from 'axios'
import { useAuthStore } from '@hooks/useAuthStore'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (username: string, password: string) =>
    api.post('/auth/login', { username, password }),
}

export const booksApi = {
  getAll: (params?: { q?: string; category_id?: string; page?: number; size?: number }) =>
    api.get('/books', { params }),
  getById: (id: string) => api.get(`/books/${id}`),
  create: (data: any) => api.post('/books', data),
  update: (id: string, data: any) => api.put(`/books/${id}`, data),
  delete: (id: string) => api.delete(`/books/${id}`),
}

export const membersApi = {
  getAll: (params?: { q?: string; page?: number; size?: number }) =>
    api.get('/members', { params }),
  getById: (id: string) => api.get(`/members/${id}`),
  create: (data: any) => api.post('/members', data),
}

export const loansApi = {
  create: (data: any) => api.post('/loans', data),
  getAll: (params?: { from?: string; to?: string; status?: string; member_id?: string; page?: number; size?: number }) =>
    api.get('/loans', { params }),
  getById: (id: string) => api.get(`/loans/${id}`),
  returnItem: (loanId: string, itemId: string) =>
    api.post(`/loans/${loanId}/items/${itemId}/return`),
  getOverdue: () => api.get('/loans/overdue'),
}

export const reportApi = {
  getMostBorrowed: (from: string, to: string) =>
    api.get('/reports/most-borrowed', { params: { from, to } }),
}

export const categoriesApi = {
  getAll: () => api.get('/categories'),
}

export const usersApi = {
  createLibrarian: (data: any) => api.post('/users', data),
}

export default api