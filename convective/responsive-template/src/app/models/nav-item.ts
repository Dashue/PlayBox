export interface NavItem {
  name: string;
  iconName: string;
  requiredRoles: string[];
  route: string;
  children: NavItem[];
}
