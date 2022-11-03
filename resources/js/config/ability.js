import { Ability } from '@casl/ability';

export default new Ability([
  {
    action: 'clear',
    subject: 'Post'
  },
  {
    action: 'delete',
    subject: 'Post',
  }
])