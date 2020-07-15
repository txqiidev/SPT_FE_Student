import store from "../redux/store";

const getColors = (id) => {
  const state = store.getState();
  const modulegroups = state.moduleGroups.moduleGroups;
  const colors = [
    "#FCA381",
    "#81DAFC",
    "#DAFC81",
    "#A381FC",
    "#FCD481",
    "#9A9A9A",
    "#fc81a9",
    "#81fcd4",
    "#d481fc",
  ];
  let modulegroupsColors = {};

  for (let i = 0; i < modulegroups.length; i++) {
    modulegroupsColors[modulegroups[i].Name] = colors[i];
  }

  return modulegroupsColors[
    modulegroups.find((mg) => mg.idModuleGroup === id).Name
  ];
};

export default { getColors };
