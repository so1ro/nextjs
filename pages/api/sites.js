import { db } from '@/lib/firebase-admin'
import { getAllSites } from '@/lib/db-admin';


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (_, res) => {
  // res.status(200).json({ name: 'John Doe' })
  const { sites, error } = await getAllSites()

  if (error) {
    res.status(500).json({ error });
  }

  res.status(200).json({ sites });;



}
