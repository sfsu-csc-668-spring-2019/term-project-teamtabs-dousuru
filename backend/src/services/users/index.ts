import { PutUserSignup } from "./PutUserSignup";
import { GetAuthValid } from "./GetAuthValid";
import { GetUserChatlogData } from "./GetUserChatlogData";
import { GetUserConfiguration } from "./GetUserConfiguration";
import { GetUserData } from "./GetUserData";
import { GetUserNotification } from "./GetUserNotification";
import { PostUserChatlog } from "./PostUserChatlog";
import { PostUserChatlogSearch } from "./PostUserChatlogSearch";
import { PostUserConfiguration } from "./PostUserConfiguration";
import { PostUserNotification } from "./PostUserNotification";
import { PostUserSearch } from "./PostUserSearch";
import { PostUserSearchContents } from "./PostUserSearchContents";

export default [
  GetAuthValid,
  GetUserChatlogData,
  GetUserConfiguration,
  GetUserData,
  GetUserNotification,
  PostUserChatlog,
  PostUserChatlogSearch,
  PostUserConfiguration,
  PostUserNotification,
  PostUserSearch,
  PostUserSearchContents,
  PutUserSignup
];
