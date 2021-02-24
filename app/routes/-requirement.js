import { getOwner } from "@ember/application";

const getRequirements = route => getOwner(route).lookup('service:requirements');

const results = {
  'sign-in': (route, transition) => {
    getRequirements(route).storeTransition(transition);
    route.transitionTo('session.new');
  },
  'denied': route => {
    route.transitionTo('index');
  }
};

export const requirement = arg => factory => {

  let definition = {
    before: null
  };

  if(typeof arg === 'string') {
    definition.before = arg;
  }

  const handle = (route, transition, requirement) => {
    let result = getRequirements(route).validateRouteRequirement(route, transition, requirement);
    if(result === true) {
      return true;
    }
    if(result === false) {
      result = 'denied';
    }
    let mapped = results[result];
    mapped(route, transition);
    return false;
  }

  return class RouteWithRequirement extends factory {

    beforeModel(transition) {
      if(definition.before && handle(this, transition, definition.before) === false) {
        return;
      }
      return super.beforeModel(...arguments);
    }

  };
}
