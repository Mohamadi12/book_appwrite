"use server";

import { createAdminClient } from "@/config/appwrite";
import { redirect } from "next/navigation";

async function getAllRooms() {
  try {
    // Initialize the admin client
    const { databases } = await createAdminClient();

    // Fetch all rooms from the database
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS
    );

    return rooms;
  } catch (error) {
    console.log("Failed to get rooms", error);
    redirect("/error");
  }
}

export default getAllRooms;
