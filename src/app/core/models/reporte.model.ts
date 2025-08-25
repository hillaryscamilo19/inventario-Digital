export interface ReportData {
  id: string
  date: Date
  type: "entry" | "exit"
  itemCode: string
  itemName: string
  category: "uniform" | "medicine"
  quantity: number
  unit: string
  employeeName?: string
  employeeArea?: string
  supplier?: string
  reason: string
  digitalSignature?: string
  batchNumber?: string
  expirationDate?: Date
}

export interface AnalyticsData {
  totalMovements: number
  totalEntries: number
  totalExits: number
  topItems: Array<{ name: string; quantity: number }>
  topAreas: Array<{ area: string; quantity: number }>
  monthlyTrend: Array<{ month: string; entries: number; exits: number }>
  categoryDistribution: Array<{ category: string; percentage: number }>
  lowStockAlerts: number
}
