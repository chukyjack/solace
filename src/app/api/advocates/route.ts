import { sql } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Check if database is available
    if (!process.env.DATABASE_URL) {
      return Response.json(
        { error: "Database not configured" },
        { status: 500 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const searchTerm = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "25", 10);

    // Validate pagination parameters
    const validPage = Math.max(1, page);
    const validPageSize = Math.max(1, Math.min(100, pageSize)); // Max 100 items per page
    const offset = (validPage - 1) * validPageSize;

    // Build WHERE clause for search using SQL template
    let whereClause = undefined;
    
    if (searchTerm.trim()) {
      const searchPattern = `%${searchTerm.trim()}%`;
      
      // Text search on firstName, lastName, city, degree using ILIKE
      // JSONB array search for specialties
      // Search in yearsOfExperience as string
      whereClause = sql`(
        ${advocates.firstName} ILIKE ${searchPattern}
        OR ${advocates.lastName} ILIKE ${searchPattern}
        OR ${advocates.city} ILIKE ${searchPattern}
        OR ${advocates.degree} ILIKE ${searchPattern}
        OR ${advocates.specialties}::text ILIKE ${searchPattern}
        OR CAST(${advocates.yearsOfExperience} AS TEXT) ILIKE ${searchPattern}
      )`;
    }

    // Get total count
    const countResult = await (whereClause
      ? db.select({ count: sql<number>`count(*)` }).from(advocates).where(whereClause)
      : db.select({ count: sql<number>`count(*)` }).from(advocates));
    
    const total = Number(countResult[0]?.count || 0);
    const totalPages = Math.ceil(total / validPageSize);

    // Fetch paginated data
    const baseQuery = db.select().from(advocates);
    const query = whereClause ? baseQuery.where(whereClause) : baseQuery;
    const data = await query.limit(validPageSize).offset(offset);

    // Transform data to match frontend interface
    const advocatesData = data.map((row) => ({
      firstName: row.firstName,
      lastName: row.lastName,
      city: row.city,
      degree: row.degree,
      specialties: row.specialties as string[],
      yearsOfExperience: row.yearsOfExperience,
      phoneNumber: Number(row.phoneNumber),
    }));

    return Response.json({
      data: advocatesData,
      pagination: {
        total,
        page: validPage,
        pageSize: validPageSize,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching advocates:", error);
    return Response.json(
      { error: "Failed to fetch advocates" },
      { status: 500 }
    );
  }
}
