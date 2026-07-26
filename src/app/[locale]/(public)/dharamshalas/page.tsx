import { redirect } from "next/navigation";
export default async function DharamshalasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect("/" + locale + "/stays?type=dharamshala");
}
