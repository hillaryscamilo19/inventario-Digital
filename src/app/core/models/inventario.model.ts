export interface inventario{
    id: string
    code: string
    name: string
    category: "uniform" | "medicine"
    type: string
    size?: string
    currentStock: number
    minStock: number
    maxStock: number
    unit: string
    location: string
    supplier: string
    lastUpdated: Date
    expirationDate?: Date
    batchNumber?: string
    status: "active" | "inactive" | "discontinued"
}