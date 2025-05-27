'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';
import { Query } from 'node-appwrite';
import { redirect } from 'next/navigation';

async function getMyRooms() {
  const sessionCookie = cookies().get('appwrite-session');
  if (!sessionCookie) {
    redirect('/login');
  }

  try {
    // Get session cookie value from cookies object 
    const { account, databases } = await createSessionClient(
      sessionCookie.value 
    );

    // Get user's ID
    const user = await account.get();
    const userId = user.$id;

    // Fetch users rooms
    const { documents: rooms } = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ROOMS,
      [Query.equal('user_id', userId)]
    );

    return rooms;
  } catch (error) {
    console.log('Failed to get user rooms', error);
    redirect('/error');
  }
}

export default getMyRooms;

// 📚 Syntaxe générale des Query
// Voici les méthodes les plus utilisées :

// Méthode	Description
// Query.equal(attr, value)	Sélectionne les documents où attr est égal à value
// Query.notEqual(attr, value)	Où attr est différent de value
// Query.greaterThan(attr, value)	Où attr est plus grand que value
// Query.lessThan(attr, value)	Où attr est plus petit que value
// Query.contains(attr, value)	Où attr contient value (utile pour des listes)
// Query.startsWith(attr, value)	Où attr commence par value
// Query.between(attr, [start, end])	Où attr est entre start et end (inclus)

// Tu peux aussi combiner plusieurs requêtes dans un tableau :

// ts
// Copier
// Modifier
// databases.listDocuments(databaseId, collectionId, [
//   Query.equal('user_id', userId),
//   Query.greaterThan('createdAt', '2024-01-01T00:00:00Z')
// ]);