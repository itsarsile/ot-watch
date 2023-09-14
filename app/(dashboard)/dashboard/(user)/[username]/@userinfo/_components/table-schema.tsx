import { z } from 'zod'

export const visitorReportSchema = z.object({
    id: z.string(),
    visitorName: z.string(),
    visitorPhone: z.string(),
    visitorAddress: z.string(),
    visitorNeeds: z.string(),
    visitorDealing: z.string(),
    visitorTrackId: z.string().optional(),
    createdAt: z.date(),
})

export type visitorReport = z.infer<typeof visitorReportSchema>