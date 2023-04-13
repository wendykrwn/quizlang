import firebase from 'firebase/app';

export const flashcardsCollection = "flashcards";

export const formatDate = (serverTimestamp: firebase.firestore.Timestamp): string => {
  // Convertir le serverTimestamp en Date
  const date: Date = serverTimestamp.toDate();
  // Obtenir les éléments de la date
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();
  const second: number = date.getSeconds();
  // Formater la date sous forme de chaîne de caractères
  const formattedDate: string = `${day}/${month}/${year}`;
  // Formater l'heure sous forme de chaîne de caractères
  const formattedTime: string = `${hour}:${minute}:${second}`;
  // Renvoyer la date et l'heure formatées
  return `${formattedDate} à ${formattedTime}`;
}

