import React from "react";
import Graph from "react-graph-vis";
import { connect } from "react-redux";
import color from "../services/color";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

const KnowledgeGraph = (props) => {
  // Assembles the graph, by defining the nodes (modules) and edges (relationships)
  const getGraphAll = () => {
    var nodes = [];
    var edges = [];
    props.modules.length > 0 &&
      props.modules.map((m) => {
        if (m.HasPrerequisite === 1) {
          nodes.push({
            id: m.idModule,
            label: m.Name,
            color: color.getColors(m.ModuleGroup_idModuleGroup),
          });

          m.prerequisiteModule.map((pm) => {
            !nodes.some((n) => n.id === pm.Module_idModule_Prerequisite) &&
              nodes.push({
                id: pm.Module_idModule_Prerequisite,
                label: pm.Name,
                color: color.getColors(
                  props.modules.find(
                    (module) =>
                      module.idModule === pm.Module_idModule_Prerequisite
                  ).ModuleGroup_idModuleGroup
                ),
              });
            edges.push({
              from: pm.Module_idModule_Prerequisite,
              to: m.idModule,
            });
          });
        }
      });
    return { nodes: nodes, edges: edges };
  };

  // Assembles graph related to one module
  const getGraphModule = () => {
    var module = props.modules.find((m) => m.idModule === props.selectedModule);

    var nodes = [
      {
        id: props.selectedModule,
        label: module.Name,
        color: color.getColors(module.ModuleGroup_idModuleGroup),
      },
    ];
    var edges = [];

    module.prerequisiteModule.map((pm) => {
      !nodes.some((n) => n.id === pm.Module_idModule_Prerequisite) &&
        nodes.push({
          id: pm.Module_idModule_Prerequisite,
          label: pm.Name,
          color: color.getColors(
            props.modules.find(
              (m) => m.idModule === pm.Module_idModule_Prerequisite
            ).ModuleGroup_idModuleGroup
          ),
        });
      edges.push({
        from: pm.Module_idModule_Prerequisite,
        to: module.idModule,
        label: props.t("Pre"),
      });
    });

    props.modules
      .filter(
        (m) =>
          m.HasPrerequisite === 1 &&
          m.prerequisiteModule.some(
            (pm) => pm.Module_idModule_Prerequisite === props.selectedModule
          )
      )
      .map((mf) => {
        !nodes.some((n) => n.id === mf.idModule) &&
          nodes.push({
            id: mf.idModule,
            label: mf.Name,
            color: color.getColors(mf.ModuleGroup_idModuleGroup),
          });
        edges.push({
          from: props.selectedModule,
          to: mf.idModule,
          label: props.t("FollUp"),
        });
      });

    return { nodes: nodes, edges: edges };
  };

  var options = {
    nodes: {
      shape: "dot",
      font: {
        size: 24,
      },
    },
    edges: {
      shadow: true,
    },
    physics: {
      enabled: false,
    },
    interaction: { multiselect: true, dragView: true },
  };

  var events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <Graph
        graph={
          props.selectedModule === "All" ? getGraphAll() : getGraphModule()
        }
        options={
          props.selectedModule === "All"
            ? options
            : {
                ...options,
                layout: {
                  hierarchical: {
                    direction: "LR",
                    sortMethod: "directed",
                    levelSeparation: 300,
                  },
                },
              }
        }
        events={events}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modules: state.modules.modules,
  };
};

export default compose(
  withNamespaces(),
  connect(mapStateToProps)
)(KnowledgeGraph);
