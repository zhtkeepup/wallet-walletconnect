import { Divider, Input } from "@nextui-org/react";
import { Fragment, ReactNode } from "react";

/**
 * Types
 */
interface Props {
    children?: ReactNode | ReactNode[];
    title: string;
}

/**
 * Component
 */
export default function PageHeader({ title, children }: Props) {
    return (
        <Fragment>
            <div style={{ marginBottom: "$5", width: "100%" }}>
                <Input
                    defaultValue={title}
                    weight="bold"
                    style={{
                        textGradient: "90deg, $secondary, $primary 30%",
                    }}
                />

                {children ? <div style={{ flex: 1 }}>{children}</div> : null}
            </div>

            <Divider css={{ marginBottom: "$10" }} />
        </Fragment>
    );
}
