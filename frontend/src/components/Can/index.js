import rules from "../../rules";

const check = (role, action, data) => {
  const permissions = rules[role];
  if (!permissions) {
    return false;
  }

  const staticPermissions = permissions.static;

  if (staticPermissions && staticPermissions.includes(action)) {
    return true;
  }

  const dynamicPermissions = permissions.dynamic;

  if (dynamicPermissions) {
    const permissionCondition = dynamicPermissions[action];
    if (!permissionCondition) {
      return false;
    }

    return permissionCondition(data);
  }
  return false;
};

const Can = ({ role, perform, data, yes, no }) =>
  check(role, perform, data) ? yes() : no();

Can.defaultProps = {
  yes: () => null,
  no: () => null
};

export { Can };
