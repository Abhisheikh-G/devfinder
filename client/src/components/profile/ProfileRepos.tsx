import { getGithubRepos } from "src/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectRepos } from "src/slices/profileSlice";

const ProfileRepos = ({ username }: { username: string }) => {
  const dispatch = useDispatch();
  const repos = useSelector(selectRepos);
  useEffect(() => {
    getGithubRepos({ dispatch, username });
  }, [dispatch, username]);

  return (
    <>
      {/* <!-- Github --> */}

      <div className="profile-github">
        <h2 className="text-primary my-1">
          <i className="fab fa-github"></i> Github Repos
        </h2>
        {repos &&
          repos.map((repo) => (
            <div className="repo bg-white p-1 my-1" key={repo.id}>
              <div>
                <h4>
                  <a
                    href={`${repo.html_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className="badge badge-dark">
                    Watchers: {repo.watchers_count}
                  </li>
                  <li className="badge badge-light">
                    Forks: {repo.forks_count}
                  </li>
                </ul>
              </div>
            </div>
          ))}

        <div className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a
                href="https://abhisheikhgill.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Repo Two
              </a>
            </h4>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              laborum!
            </p>
          </div>
          <div>
            <ul>
              <li className="badge badge-primary">Stars: 44</li>
              <li className="badge badge-dark">Watchers: 21</li>
              <li className="badge badge-light">Forks: 25</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRepos;
