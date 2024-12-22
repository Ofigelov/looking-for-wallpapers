import { FilterService } from "../filter/filter-service";
import { KonaGrid } from "./kona-grid";

const ROOT_ENDPOINT = "http://localhost:8010/api";

export const KonaFilter = () => {
  return (
    <FilterService
      endpoint={`${ROOT_ENDPOINT}/post.json`}
      initialFilters={{ tags: ["rating:safe"] }}
      requiredParams={{ limit: 100 }}
      takeFirstFromApi
    >
      <KonaGrid predictiveEndpoint={`${ROOT_ENDPOINT}/tag.json`} />
    </FilterService>
  );
};
