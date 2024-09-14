import { useMemo } from "react";
import { useSnapshot } from "valtio";
import { Image, Input } from "@nextui-org/react";
import SettingsStore from "@/store/SettingsStore";
// import ReportIcon from "@mui/icons-material/Report";
// import ReportProblemIcon from "@mui/icons-material/ReportProblem";
// import NewReleasesIcon from "@mui/icons-material/NewReleases";
import { Avatar, Link } from "@nextui-org/react";
import { SignClientTypes } from "@walletconnect/types";

/**
 * Types
 */
interface IProps {
    metadata: SignClientTypes.Metadata;
}

// const StyledContainer = styled(Row, {
//     padding: "7px",
//     borderRadius: "30px",
//     marginTop: "10px",
//     marginBottom: "10px",
// } as any);

// const StyledUnknownRow = styled(StyledContainer, {
//     color: "$warning",
//     border: "0.5px solid $warning",
// } as any);

// const StyledUnknownContainer = styled("div", {
//     textAlign: "initial",
// } as any);

// const StyledInvalidRow = styled(StyledContainer, {
//     color: "$error",
//     border: "0.5px solid $error",
// } as any);

// const StyledInvalidContainer = styled("div", {
//     textAlign: "initial",
// } as any);

// const StyledDescription = styled(Text, {
//     lineHeight: "20px",
//     fontSize: "15px",
// } as any);
/**
 * Components
 */
export default function VerifyInfobox({ metadata }: IProps) {
    const { currentRequestVerifyContext } = useSnapshot(SettingsStore.state);
    const validation = currentRequestVerifyContext?.verified.validation;
    return (
        <div style={{ textAlign: "center" }}>
            {currentRequestVerifyContext?.verified.isScam ? (
                <div>
                    <div style={{ margin: "auto" }}>
                        <div>Known secury risk</div>
                        <div>
                            <p>
                                This website is flagged as unsafe by multiple
                                security reports. Leave immediately to protect
                                your assets.
                            </p>
                        </div>
                    </div>
                </div>
            ) : validation == "UNKNOWN" ? (
                <div>
                    <div style={{ margin: "auto" }}>
                        <div>
                            <p>Unknown domain</p>
                        </div>
                        <div>
                            <p>
                                This domain cannot be verified. Please check the
                                request carefully before approving.
                            </p>
                        </div>
                    </div>
                </div>
            ) : validation == "INVALID" ? (
                <div>
                    <div style={{ margin: "auto" }}>
                        <div>
                            <p>Domain mismatch</p>
                        </div>
                        <div>
                            <p>
                                This website has a domain that does not match
                                the sender of this request. Approving may lead
                                to loss of funds.
                            </p>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
