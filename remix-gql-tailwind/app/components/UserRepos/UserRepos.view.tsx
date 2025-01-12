import * as styles from './UserRepos.classNames';

import { Link } from 'remix';
import Pagination from '../Pagination/Pagination';
import PrivacyBadge from '../PrivacyBadge/PrivacyBadge';
import type { Repo } from './types';
import RepoFilters from '../RepoFilters/RepoFilters';
import RepoMeta from '../RepoMeta/RepoMeta';
import { StarIcon } from '@heroicons/react/outline';
import { filterRepos } from './filterRepos';
import { getLanguages } from './getLanguages';
import { useRepoFilters } from '../RepoFilters/useRepoFilters';

export interface UserReposViewProps {
  repos: Repositories;
  owner: string;
}

export interface Repositories {
  repos: Repo[];
  pageInfo:
    | {
        __typename?: 'PageInfo' | undefined;
        endCursor?: string | null | undefined;
        startCursor?: string | null | undefined;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      }
    | undefined;
}

function UserReposView({ repos, owner }: UserReposViewProps) {
  const repoFilters = useRepoFilters();
  const filteredRepos = filterRepos(repos.repos, repoFilters.state);
  const languages = getLanguages(repos.repos);

  return (
    <>
      <RepoFilters
        {...repoFilters}
        languages={languages}
        resultCount={filteredRepos.length}
      />
      {filteredRepos.map(
        ({
          id,
          name,
          description,
          stargazerCount,
          forkCount,
          language,
          languageColor,
          updatedAt,
          isPrivate,
        }) => (
          <div key={id} className={styles.container}>
            <div className={styles.content}>
              <h3 className="mb-2">
                <Link to={`/${owner}/${name}`} className={styles.headingLink}>
                  {name}
                </Link>
                <PrivacyBadge
                  isPrivate={isPrivate}
                  className="relative bottom-0.5"
                />
              </h3>
              <div className={styles.description}>{description}</div>
              <RepoMeta
                language={language}
                languageColor={languageColor}
                forkCount={forkCount}
                stargazerCount={stargazerCount}
                updatedAt={updatedAt}
              />
            </div>
            <div className={styles.aside}>
              <button className={styles.starBtn}>
                <StarIcon className={styles.starIcon} />
                Star
              </button>
            </div>
          </div>
        )
      )}
      {(repos.pageInfo?.hasNextPage || repos.pageInfo?.hasPreviousPage) && (
        <Pagination pageInfo={repos.pageInfo} owner={owner} />
      )}
    </>
  );
}

export default UserReposView;
