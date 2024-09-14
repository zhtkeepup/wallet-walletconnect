import { useMemo } from "react";
import { useSnapshot } from "valtio";
import SettingsStore from "@/store/SettingsStore";
// import ReportIcon from '@mui/icons-material/Report'
// import ReportProblemIcon from '@mui/icons-material/ReportProblem'
// import NewReleasesIcon from '@mui/icons-material/NewReleases'
import { Avatar, Link, Input } from "@nextui-org/react";
import { SignClientTypes } from "@walletconnect/types";

/**
 * Types
 */
interface IProps {
    metadata: SignClientTypes.Metadata;
    intention?: string;
}

// const StyledLink = styled('span', {
//   color: '#697177'
// } as any)

// const StyledVerifiedIcon = styled('img', {
//   verticalAlign: 'middle',
//   marginRight: '5px'
// } as any)

// const StyledUnknownRow = styled(Row, {
//   color: '$warning'
//   // marginTop: '10px'
// } as any)

// const StyledUnknownContainer = styled('div', {
//   padding: '7px'
// } as any)

// const StyledInvalidRow = styled(Row, {
//   color: '$error'
//   // marginTop: '10px'
// } as any)

// const StyledInvalidContainer = styled('div', {
//   padding: '7px'
// } as any)

/**
 * Components
 */
export default function ProjectInfoCard({ metadata, intention }: IProps) {
    const { currentRequestVerifyContext } = useSnapshot(SettingsStore.state);
    const validation = currentRequestVerifyContext?.verified.validation;
    const { icons, name, url } = metadata;

    return (
        <div style={{ textAlign: "center" }}>
            <div>
                <div>
                    <Avatar
                        style={{ margin: "auto" }}
                        src={icons[0]}
                        size={"xl"}
                    />
                </div>
            </div>
            <div>
                <div>
                    <span>{name}</span> <br />
                    <Input
                        defaultValue={`wants to ${
                            intention ? intention : "connect"
                        }`}
                    />
                </div>
            </div>
            <div>
                <div>
                    {validation == "VALID" ? (
                        <img
                            src="/icons/verified-domain.svg"
                            data-testid="session-info-verified"
                        />
                    ) : null}
                    <Link
                        style={{ verticalAlign: "middle" }}
                        href={url}
                        data-testid="session-info-card-url"
                    >
                        {url}
                    </Link>
                </div>
            </div>
            {currentRequestVerifyContext?.verified.isScam ? (
                <div>
                    <div style={{ margin: "auto" }}>
                        <p>Potential threat</p>
                    </div>
                </div>
            ) : validation == "UNKNOWN" ? (
                <div>
                    <div style={{ margin: "auto" }}>
                        <p>Cannot Verify</p>
                    </div>
                </div>
            ) : validation == "INVALID" ? (
                <div>
                    <div style={{ margin: "auto" }}>
                        <p>Invalid Domain</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
