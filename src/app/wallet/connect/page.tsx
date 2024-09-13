"use client";

// import Navigation from "@/components/Navigation";
import Main from "../main";
import Connect from "./connect";

export default function Page() {
    const c = () => {
        return <Connect></Connect>;
    };
    return <Main Content={c}></Main>;
}
