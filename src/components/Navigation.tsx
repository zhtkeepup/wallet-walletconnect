import { Avatar } from "@nextui-org/react";
import Image from "next/image";

export default function Navigation() {
    return (
        <div style={{ display: "flex", margin: "20px" }}>
            <a
                href="/wallet/accounts"
                className="navLink"
                data-testid="accounts"
            >
                <Image
                    alt="accounts icon"
                    src="/icons/accounts-icon.svg"
                    width={27}
                    height={27}
                />
            </a>

            <a
                href="/wallet/sessions"
                className="navLink"
                data-testid="sessions"
            >
                <Image
                    alt="sessions icon"
                    src="/icons/sessions-icon.svg"
                    width={27}
                    height={27}
                />
            </a>

            <a
                href="/wallet/walletconnect"
                className="navLink"
                data-testid="wc-connect"
            >
                <Avatar
                    size="lg"
                    css={{ cursor: "pointer" }}
                    color="gradient"
                    icon={
                        <Image
                            alt="wallet connect icon"
                            src="/wallet-connect-logo.svg"
                            width={30}
                            height={30}
                        />
                    }
                />
            </a>

            <a
                href="/wallet/pairings"
                className="navLink"
                data-testid="pairings"
            >
                <Image
                    alt="pairings icon"
                    src="/icons/pairings-icon.svg"
                    width={25}
                    height={25}
                />
            </a>

            <a
                href="/wallet/settings"
                className="navLink"
                data-testid="settings"
            >
                <Image
                    alt="settings icon"
                    src="/icons/settings-icon.svg"
                    width={27}
                    height={27}
                />
            </a>
        </div>
    );
}
