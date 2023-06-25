import { getImages } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export default function Test() {
  const { data, error, isLoading } = useQuery(["images"], async () => {
    const res = await getImages("./images/Test mission-1/photos.jpg");
    return res.data;
  });
  if (isLoading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Error</div>;
  }
  console.log(data);
  return (
    <>
      <div>test</div>
      <img src={URL.createObjectURL(data)} alt="test" />
    </>
  );
}
