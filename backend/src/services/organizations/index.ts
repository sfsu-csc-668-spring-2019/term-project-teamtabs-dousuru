import { GetOrganizationChatlogData } from "./GetOrganizationChatlogData";
import { GetOrganizationData } from "./GetOrganizationData";
import { PutOrganizationChatlogData } from "./PutOrganizationChatlogData";
import { PutOrganization } from "./PutOrganization";
import { DeleteOrganization } from "./DeleteOrganization";
import { PostOrganizationInvite } from "./PostOrganizationInvite";
import { PostOrganizationJoin } from "./PostOrganizationJoin";
import { PostOrganizationLeave } from "./PostOrganizationLeave";
import { PostOrganizationSearch } from "./PostOrganizationSearch";
import { ListOrganizations } from "./ListOrganizations";

export default [
  DeleteOrganization,
  GetOrganizationChatlogData,
  ListOrganizations,
  GetOrganizationData,
  PostOrganizationInvite,
  PostOrganizationJoin,
  PostOrganizationLeave,
  PostOrganizationSearch,
  PutOrganizationChatlogData,
  PutOrganization
];
