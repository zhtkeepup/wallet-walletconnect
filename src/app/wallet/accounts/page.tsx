"use client";

// import Navigation from "@/components/Navigation";
import Main from "../main";

import Accounts from "./accounts";

export default function Page() {
    const c = () => {
        return <Accounts />;
    };
    return <Main Content={c}></Main>;
}
