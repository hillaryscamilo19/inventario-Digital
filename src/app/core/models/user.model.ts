export interface User{
    id: string
    username: string
    role: UserRole
    name: string
    area?: string
}

export interface UserRole{
    name: "admin" | "delivery" | "auditor"
}