"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {

    const router = useRouter();

    useEffect(() => {
    const token = localStorage.getItem('authToken');

        if (!token) {
            router.push('/login');
        }
  }, [router]);

    return(
        <div>Comunicados</div>
    )
}

export default Page