import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/common/enums/role.enum';

export const ROLE_KEY = 'role';

export const Roles = (...role: ROLES[]) => SetMetadata(ROLE_KEY, role);
