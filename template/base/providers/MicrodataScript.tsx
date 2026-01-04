import Script from "next/script";
import type { WithContext } from "schema-dts";
import type { SchemaType, SchemaTypeMap } from "@/lib/microdata";

interface MicrodataScriptProps {
	id: string;
	microdata: WithContext<SchemaTypeMap[SchemaType]>;
}

export function MicrodataScript({ id, microdata }: MicrodataScriptProps) {
	return (
		<Script
			id={id}
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata) }}
		/>
	);
}
