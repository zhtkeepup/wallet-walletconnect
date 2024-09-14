import { Input } from "@nextui-org/react";
import { CodeBlock, codepen } from "react-code-blocks";

/**
 * Types
 */
interface IProps {
    data: Record<string, unknown>;
}

/**
 * Component
 */
export default function RequestDataCard({ data }: IProps) {
    return (
        <div>
            <div>
                <Input defaultValue="Data" />
                <CodeBlock
                    showLineNumbers={false}
                    text={JSON.stringify(data, null, 2)}
                    theme={codepen}
                    language="json"
                />
            </div>
        </div>
    );
}
