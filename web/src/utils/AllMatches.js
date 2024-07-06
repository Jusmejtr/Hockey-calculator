import useSWR from 'swr';

import { fetcher } from './fetcher';

function AllMatches() {
    const { data, error, isLoading } = useSWR('/all-matches', fetcher);

    return {
        data: data,
        isLoading,
        isError: error
      }
}

export default AllMatches