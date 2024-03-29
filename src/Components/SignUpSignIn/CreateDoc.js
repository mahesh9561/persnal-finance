import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useState } from "react";

export const createDoc = async (user, name) => {
    if (!user) return;

    const userRef = doc(db, "user", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
        try {
            await setDoc(userRef, {
                name: user.displayName ? user.displayName : name,
                email: user.email,
                photoUrl: user.photoURL ? user.photoURL : "../../assets/avatar.png",
                createAt: new Date(),
            });
            toast.success("Document Created");
        } catch (error) {
            console.error("Error creating document:", error);
            toast.error("Error creating document");
        }
    } else {
        toast.error("User Already Exists");
    }
};