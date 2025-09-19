import { Schema } from "@/types";


export default function SchemaInjector({ schemas }: { schemas?: Schema | Schema[] }) {
  if (!schemas) return null;

  const normalizedSchemas = Array.isArray(schemas) ? schemas : [schemas];

  return (
    <>
      {normalizedSchemas.map((schema, i) => (
        <script
          key={schema.id ?? i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema.schema_json ?? schema),
          }}
        />
      ))}
    </>
  );
}
