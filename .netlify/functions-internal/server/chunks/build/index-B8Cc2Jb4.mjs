import { _ as _sfc_main$7, a as _sfc_main$3, b as _sfc_main$2, t as tv, P as Primitive } from './Button-CkwDVvhg.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSlots, computed, unref, createBlock, createCommentVNode, openBlock, renderSlot, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, u as useHead, a as useAppConfig, n as navigateTo } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:url';
import 'ipx';
import 'node:fs';
import 'node:path';
import './index-uyjXs1eU.mjs';
import './nuxt-link-Cc0xWXnE.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const theme = {
  "slots": {
    "root": "rounded-lg overflow-hidden",
    "header": "p-4 sm:px-6",
    "body": "p-4 sm:p-6",
    "footer": "p-4 sm:px-6"
  },
  "variants": {
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted"
      },
      "outline": {
        "root": "bg-default ring ring-default divide-y divide-default"
      },
      "soft": {
        "root": "bg-elevated/50 divide-y divide-default"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default divide-y divide-default"
      }
    }
  },
  "defaultVariants": {
    "variant": "outline"
  }
};
const _sfc_main$1 = {
  __name: "UCard",
  __ssrInlineRender: true,
  props: {
    as: { type: null, required: false },
    variant: { type: null, required: false },
    class: { type: null, required: false },
    ui: { type: null, required: false }
  },
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const appConfig = useAppConfig();
    const ui = computed(() => tv({ extend: tv(theme), ...appConfig.ui?.card || {} })({
      variant: props.variant
    }));
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: __props.as,
        class: ui.value.root({ class: [props.ui?.root, props.class] })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!!slots.header) {
              _push2(`<div class="${ssrRenderClass(ui.value.header({ class: props.ui?.header }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.default) {
              _push2(`<div class="${ssrRenderClass(ui.value.body({ class: props.ui?.body }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (!!slots.footer) {
              _push2(`<div class="${ssrRenderClass(ui.value.footer({ class: props.ui?.footer }))}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !!slots.header ? (openBlock(), createBlock("div", {
                key: 0,
                class: ui.value.header({ class: props.ui?.header })
              }, [
                renderSlot(_ctx.$slots, "header")
              ], 2)) : createCommentVNode("", true),
              !!slots.default ? (openBlock(), createBlock("div", {
                key: 1,
                class: ui.value.body({ class: props.ui?.body })
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)) : createCommentVNode("", true),
              !!slots.footer ? (openBlock(), createBlock("div", {
                key: 2,
                class: ui.value.footer({ class: props.ui?.footer })
              }, [
                renderSlot(_ctx.$slots, "footer")
              ], 2)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.pnpm/@nuxt+ui@3.3.0_@babel+parser@7.28.0_@netlify+blobs@9.1.2_axios@1.11.0_change-case@5.4.4_db0@0_4ug4xeluzodqbqydcdxspnoja4/node_modules/@nuxt/ui/dist/runtime/components/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    name: "HomePage"
  },
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "CreateLED Chat 智能对话平台 - 组织架构",
      meta: [
        { name: "description", content: "企业智能对话平台，支持多部门AI对话服务" }
      ]
    });
    const navigateToDepartment = (department) => {
      navigateTo(`/chat/${department}`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$7;
      const _component_UBadge = _sfc_main$3;
      const _component_UCard = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" }, _attrs))} data-v-ba4d173c><header class="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20" data-v-ba4d173c><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-ba4d173c><div class="flex justify-between items-center py-6" data-v-ba4d173c><div class="flex items-center space-x-3" data-v-ba4d173c><div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chat-bubble-left-right",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div><h1 class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-ba4d173c> CreateLED Chat 智能对话平台</h1></div><div class="flex items-center space-x-4" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: "primary",
        variant: "subtle",
        class: "animate-pulse"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`组织架构`);
          } else {
            return [
              createTextVNode("组织架构")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-ba4d173c><div class="text-center mb-16 animate-fade-in" data-v-ba4d173c><div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-sparkles",
        class: "w-8 h-8 text-white"
      }, null, _parent));
      _push(`</div><h2 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6" data-v-ba4d173c> 选择部门开始对话</h2><p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed" data-v-ba4d173c>点击下方部门卡片，进入AI智能对话界面，体验前沿的人工智能技术</p><div class="mt-8 flex justify-center" data-v-ba4d173c><div class="flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 shadow-md" data-v-ba4d173c><div class="w-2 h-2 bg-green-500 rounded-full animate-ping" data-v-ba4d173c></div><span class="text-sm text-gray-700 font-medium" data-v-ba4d173c>AI平台在线服务</span></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-red-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("president")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-star",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}>总裁部门 </h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>President Office</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-star",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300" }, "总裁部门 "),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "President Office")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责企业战略规划、重大决策和整体运营管理</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`战略规划`);
                } else {
                  return [
                    createTextVNode("战略规划")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`决策管理`);
                } else {
                  return [
                    createTextVNode("决策管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入总裁部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入总裁部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责企业战略规划、重大决策和整体运营管理"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("战略规划")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("决策管理")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入总裁部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("sales")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chart-bar",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 销售部门</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>Sales Department</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300" }, " 销售部门"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Sales Department")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责产品销售、客户开发和销售业绩管理</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`客户开发`);
                } else {
                  return [
                    createTextVNode("客户开发")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`销售管理`);
                } else {
                  return [
                    createTextVNode("销售管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入销售部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入销售部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责产品销售、客户开发和销售业绩管理"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("客户开发")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("销售管理")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入销售部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("marketing")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-megaphone",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 市场部门</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>Marketing Department</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-megaphone",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300" }, " 市场部门"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Marketing Department")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责市场推广、品牌建设和市场分析</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`品牌推广`);
                } else {
                  return [
                    createTextVNode("品牌推广")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`市场分析`);
                } else {
                  return [
                    createTextVNode("市场分析")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入市场部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入市场部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责市场推广、品牌建设和市场分析"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("品牌推广")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("市场分析")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入市场部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("quality")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shield-check",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 品质中心</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>Quality Center</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shield-check",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300" }, " 品质中心"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Quality Center")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责质量管理、质量控制和质量体系建设</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`质量控制`);
                } else {
                  return [
                    createTextVNode("质量控制")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`体系建设`);
                } else {
                  return [
                    createTextVNode("体系建设")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入品质中心对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入品质中心对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责质量管理、质量控制和质量体系建设"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("质量控制")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("体系建设")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入品质中心对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-indigo-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("supply-chain")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-truck",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 供应链部门</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>Supply Chain</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-truck",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300" }, " 供应链部门"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Supply Chain")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责采购管理、供应商管理和物流协调</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`采购管理`);
                } else {
                  return [
                    createTextVNode("采购管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`物流协调`);
                } else {
                  return [
                    createTextVNode("物流协调")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入供应链部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入供应链部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责采购管理、供应商管理和物流协调"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("采购管理")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("物流协调")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入供应链部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-cyan-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("rd")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-light-bulb",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 研发部门</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>R&amp;D Department</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-light-bulb",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-cyan-600 transition-colors duration-300" }, " 研发部门"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "R&D Department")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责产品研发、技术创新和技术支持</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`产品研发`);
                } else {
                  return [
                    createTextVNode("产品研发")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`技术创新`);
                } else {
                  return [
                    createTextVNode("技术创新")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入研发部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入研发部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责产品研发、技术创新和技术支持"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("产品研发")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("技术创新")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-cyan-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入研发部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-yellow-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("finance")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-currency-dollar",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 财务部门</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>Finance Department</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-currency-dollar",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-300" }, " 财务部门"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Finance Department")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责财务管理、成本控制和财务分析</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`财务管理`);
                } else {
                  return [
                    createTextVNode("财务管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`成本控制`);
                } else {
                  return [
                    createTextVNode("成本控制")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入财务部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入财务部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责财务管理、成本控制和财务分析"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("财务管理")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("成本控制")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入财务部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, {
        class: "group hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-orange-50/50 border-0 shadow-lg backdrop-blur-sm",
        onClick: ($event) => navigateToDepartment("production-chengdu")
      }, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center space-x-3" data-v-ba4d173c${_scopeId}><div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-cog-6-tooth",
              class: "w-6 h-6 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-ba4d173c${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300" data-v-ba4d173c${_scopeId}> 生产部门</h3><p class="text-xs text-gray-500 font-medium" data-v-ba4d173c${_scopeId}>Production (Chengdu)</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center space-x-3" }, [
                createVNode("div", { class: "w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-cog-6-tooth",
                    class: "w-6 h-6 text-white"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300" }, " 生产部门"),
                  createVNode("p", { class: "text-xs text-gray-500 font-medium" }, "Production (Chengdu)")
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3" data-v-ba4d173c${_scopeId}><p class="text-gray-600 leading-relaxed text-sm" data-v-ba4d173c${_scopeId}>负责生产计划、生产管理和设备维护</p><div class="flex flex-wrap gap-1" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`生产管理`);
                } else {
                  return [
                    createTextVNode("生产管理")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UBadge, {
              variant: "soft",
              class: "px-2 py-1 text-xs"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`设备维护`);
                } else {
                  return [
                    createTextVNode("设备维护")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-2" data-v-ba4d173c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "solid",
              size: "sm",
              block: "",
              class: "group-hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` 进入生产部门对话 `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" 进入生产部门对话 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("p", { class: "text-gray-600 leading-relaxed text-sm" }, "负责生产计划、生产管理和设备维护"),
                createVNode("div", { class: "flex flex-wrap gap-1" }, [
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("生产管理")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UBadge, {
                    variant: "soft",
                    class: "px-2 py-1 text-xs"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("设备维护")
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "pt-2" }, [
                  createVNode(_component_UButton, {
                    variant: "solid",
                    size: "sm",
                    block: "",
                    class: "group-hover:bg-orange-600 transition-all duration-300 shadow-md hover:shadow-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(" 进入生产部门对话 ")
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-16 text-center" data-v-ba4d173c><div class="bg-white rounded-lg shadow-sm p-6" data-v-ba4d173c><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-ba4d173c>平台特色</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ba4d173c><div class="flex items-center space-x-3" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cpu-chip",
        class: "w-8 h-8 text-blue-500"
      }, null, _parent));
      _push(`<div class="text-left" data-v-ba4d173c><h4 class="font-medium text-gray-900" data-v-ba4d173c>多AI平台集成</h4><p class="text-sm text-gray-600" data-v-ba4d173c>支持主流AI对话平台</p></div></div><div class="flex items-center space-x-3" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-8 h-8 text-green-500"
      }, null, _parent));
      _push(`<div class="text-left" data-v-ba4d173c><h4 class="font-medium text-gray-900" data-v-ba4d173c>安全可靠</h4><p class="text-sm text-gray-600" data-v-ba4d173c>企业级安全保障</p></div></div><div class="flex items-center space-x-3" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-rocket-launch",
        class: "w-8 h-8 text-purple-500"
      }, null, _parent));
      _push(`<div class="text-left" data-v-ba4d173c><h4 class="font-medium text-gray-900" data-v-ba4d173c>高效便捷</h4><p class="text-sm text-gray-600" data-v-ba4d173c>一站式智能对话体验</p></div></div></div></div></div></main><footer class="mt-20 py-12 bg-gradient-to-r from-gray-50 to-blue-50/30 border-t border-gray-100" data-v-ba4d173c><div class="max-w-6xl mx-auto px-6 text-center" data-v-ba4d173c><div class="flex items-center justify-center space-x-2 mb-4" data-v-ba4d173c><div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-chat-bubble-left-right",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><span class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" data-v-ba4d173c> CreateLED Chat </span></div><p class="text-gray-600 mb-6 max-w-2xl mx-auto" data-v-ba4d173c> 基于人工智能技术的企业级智能对话平台，为不同部门提供专业的AI助手服务 </p><div class="flex items-center justify-center space-x-6 mb-6" data-v-ba4d173c><div class="flex items-center space-x-2 text-sm text-gray-500" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-ba4d173c>安全可靠</span></div><div class="flex items-center space-x-2 text-sm text-gray-500" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bolt",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-ba4d173c>高效智能</span></div><div class="flex items-center space-x-2 text-sm text-gray-500" data-v-ba4d173c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-heart",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span data-v-ba4d173c>用户友好</span></div></div><div class="text-sm text-gray-400" data-v-ba4d173c> © 2024 CreateLED. All rights reserved. Powered by AI Technology. </div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba4d173c"]]);

export { index as default };
//# sourceMappingURL=index-B8Cc2Jb4.mjs.map
