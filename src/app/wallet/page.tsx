"use client";

// import Navigation from "@/components/Navigation";
import Main from "./main";

export default function Page() {
    const c = () => {
        return <div>xyz</div>;
    };
    return <Main Content={c}></Main>;
}
