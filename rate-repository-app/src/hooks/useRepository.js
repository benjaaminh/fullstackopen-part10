import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
  const { data, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: "cache-and-network",
    variables: {
      repositoryId,
    },
  });

  const repository = data?.repository;
console.log(repository)
  return {
    repository,
    loading,
  };
};

export default useRepository;