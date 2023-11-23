import { z } from 'zod';

export const UserNameSchema = z.object({
  firstName: z.string().min(1).trim(),
  middleName: z.string().nonempty().optional(),
  lastName: z.string().min(1).trim(),
});
