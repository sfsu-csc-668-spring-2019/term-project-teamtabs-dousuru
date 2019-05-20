import { GetProjectChatlogData } from "./GetProjectChatlogData";
import { GetProjectData } from "./GetProjectData";
import { PutProjectChatlogData } from "./PutProjectChatlogData";
import { PutProject } from "./PutProject";
import { DeleteProject } from "./DeleteProject";
import { PostProjectSearch } from "./PostProjectSearch";
import { GetProjectsByOrganization } from "./GetProjectsByOrganization";
import { PostProjectUpdate } from "./PostProjectUpdate";

export default [
  DeleteProject,
  GetProjectChatlogData,
  GetProjectData,
  PostProjectSearch,
  PutProject,
  PutProjectChatlogData,
  GetProjectsByOrganization,
  PostProjectUpdate
];
