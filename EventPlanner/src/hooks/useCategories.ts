import useSWR from "swr";

type Categories = {
  id: number;
  name: string;
}[];

export const useCategories = () => {
  const { data, isLoading, error } = useSWR<Categories>(
    "https://localhost:7142/api/categories"
  );
  return { data, isLoading, error };
};
