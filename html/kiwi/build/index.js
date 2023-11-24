/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "cba72afab4dbec157b67";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/index.js","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./HotModule.js":
/*!**********************!*\
  !*** ./HotModule.js ***!
  \**********************/
/*! exports provided: HotModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HotModule", function() { return HotModule; });

function replacePrototypeFunctions(src, target) {

    var keys = Object.getOwnPropertyNames(src.prototype),
    	index, keys, key;
    for( var index in keys ){
    	key = keys[index];
    	
    	if( key !== 'constructor' ){
    		
    		switch( typeof src.prototype[key] ){
    			case 'undefined':
    				
    				if( window.console ) console.log('replacePrototypeFunction(GET/SET):', key);
    				var srcValue = Object.assign({}, Object.getOwnPropertyDescriptor(src.prototype,key) );
    				Object.defineProperty(target.prototype,key,srcValue);
    			break;
    			default:
    				
    				if( target.prototype[key].toString() !== src.prototype[key].toString() ){
    					if( window.console ) console.log('replacePrototypeFunction('+( typeof src.prototype[key] ).toUpperCase() +'):', key);
    					target.prototype[key] = src.prototype[key];
    				}    				
    			break;
    		}
    	}	
    }
}


function replaceStaticFunctions(src, target){
    var props = Object.getOwnPropertyNames(src);
    for( var s in props ){
        if( props[s] !== 'prototype' && src[ props[s] ] !== target[ props[s] ] ){
            console.log('change', props[s]);
            target[ props[s] ] = src[ props[s] ];
        }
    }
}

function HotModule(module, ...cls){
	
	if( module.hot ){
		module.hot.accept();
	}

    if( !HotModule.registered ){
        HotModule.registered = {};
    }


   cls.forEach( (value)=>{
        
        let name = value.name;

        if( !HotModule.registered[name] ){
            HotModule.registered[name] = value;
            if( window.console ) console.log('[HotModule.NEW]',name);
        }

        // COMPARE & REPLACE
        if( HotModule.registered[name] !== value ){
            
            if( window.console ) console.log('[HotModule.CHANGED]', name);
            replacePrototypeFunctions(
                value, 
                HotModule.registered[name]
            );

            replaceStaticFunctions(
                value,
                HotModule.registered[name]
            );


        }
    })

	
}




/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/fonts/fonts.scss":
/*!****************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2!./src/assets/fonts/fonts.scss ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "/*@font-face {\r\n  font-family: 'flashlight';\r\n  src:  url('./flashlight.otf') format('opentype'),\r\n        url('./flashlight.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n\r\n}\r\n\r\n\r\n@font-face {\r\n  font-family: 'pencil-1';\r\n  src:  url('./Thin Pencil Handwriting.otf') format('opentype'),\r\n        url('./Thin Pencil Handwriting.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'pencil-2';\r\n  src:  url('./PPETRIAL.otf') format('opentype'),\r\n        url('./PPETRIAL.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n\r\n@import url('https://fonts.googleapis.com/css?family=Schoolbell');*/\n", "",{"version":3,"sources":["E:/X64BACKUP/desktop/kiwi/src/assets/fonts/src/assets/fonts/fonts.scss","E:/X64BACKUP/desktop/kiwi/src/assets/fonts/fonts.scss"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;;;;;;;;mEC2BmE","file":"fonts.scss","sourcesContent":["/*@font-face {\r\n  font-family: 'flashlight';\r\n  src:  url('./flashlight.otf') format('opentype'),\r\n        url('./flashlight.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n\r\n}\r\n\r\n\r\n@font-face {\r\n  font-family: 'pencil-1';\r\n  src:  url('./Thin Pencil Handwriting.otf') format('opentype'),\r\n        url('./Thin Pencil Handwriting.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'pencil-2';\r\n  src:  url('./PPETRIAL.otf') format('opentype'),\r\n        url('./PPETRIAL.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n\r\n@import url('https://fonts.googleapis.com/css?family=Schoolbell');*/\r\n","/*@font-face {\r\n  font-family: 'flashlight';\r\n  src:  url('./flashlight.otf') format('opentype'),\r\n        url('./flashlight.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n\r\n}\r\n\r\n\r\n@font-face {\r\n  font-family: 'pencil-1';\r\n  src:  url('./Thin Pencil Handwriting.otf') format('opentype'),\r\n        url('./Thin Pencil Handwriting.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'pencil-2';\r\n  src:  url('./PPETRIAL.otf') format('opentype'),\r\n        url('./PPETRIAL.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n}\r\n\r\n\r\n@import url('https://fonts.googleapis.com/css?family=Schoolbell');*/\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/App.scss":
/*!*****************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2!./src/lib/App.scss ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Imports
var urlEscape = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/url-escape.js */ "./node_modules/css-loader/dist/runtime/url-escape.js");
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(/*! ../assets/img/paper.jpg */ "./src/assets/img/paper.jpg"));

// Module
exports.push([module.i, "body {\n  font-family: Arial;\n  background-color: #ffffff; }\n\n.paper {\n  background-image: url(" + ___CSS_LOADER_URL___0___ + ");\n  background-position: center; }\n\ncanvas {\n  display: block;\n  position: absolute;\n  left: 0;\n  top: 0; }\n", "",{"version":3,"sources":["E:/X64BACKUP/desktop/kiwi/src/lib/src/lib/App.scss"],"names":[],"mappings":"AACA;EACC,kBAAkB;EAClB,yBAAwB,EAAA;;AAGzB;EACC,+CAAgD;EAChD,2BAA0B,EAAA;;AAG3B;EACC,cAAc;EACd,kBAAkB;EAClB,OAAO;EACP,MAAM,EAAA","file":"App.scss","sourcesContent":["\r\nbody{\r\n\tfont-family: Arial;\r\n\tbackground-color:#ffffff;\r\n}\r\n\r\n.paper{\r\n\tbackground-image: url('../assets/img/paper.jpg');\r\n\tbackground-position:center;\r\n}\r\n\r\ncanvas{\r\n\tdisplay: block;\r\n\tposition: absolute;\r\n\tleft: 0;\r\n\ttop: 0;\r\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/DataSheet.scss":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2!./src/lib/interface/DataSheet.scss ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".datasheet {\n  z-index: 10;\n  position: absolute;\n  left: 1em;\n  top: 1em;\n  width: 400px;\n  font-size: 1.2em;\n  color: #333;\n  background: white;\n  padding: 0.5em; }\n  .datasheet.hidden {\n    display: none; }\n  .datasheet .title {\n    margin: 0 1em 0 30%;\n    font-size: 1.1em;\n    padding: 0;\n    text-align: center; }\n  .datasheet .button {\n    position: absolute;\n    top: 0.5em;\n    right: 0.5em; }\n  .datasheet .menu {\n    width: 100%;\n    position: relative; }\n    .datasheet .menu .button {\n      position: absolute;\n      z-index: 2;\n      top: auto;\n      bottom: 0; }\n      .datasheet .menu .button:first-of-type {\n        left: 0; }\n      .datasheet .menu .button:last-of-type {\n        right: 0; }\n    .datasheet .menu .info {\n      text-align: center;\n      font-size: 0.70em; }\n      .datasheet .menu .info span:first-of-type:after {\n        content: \" / \"; }\n    .datasheet .menu .content {\n      min-height: 300px;\n      position: relative;\n      overflow: hidden;\n      margin-bottom: 0.5em; }\n      .datasheet .menu .content .node {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        left: 100%;\n        background: white;\n        transition: left 0.3s; }\n        .datasheet .menu .content .node p {\n          margin: 0 0 0 30%;\n          padding: 0.3em 0 0 1em;\n          font-size: 0.8em;\n          height: 100%;\n          box-sizing: border-box;\n          width: 70%;\n          overflow-y: auto; }\n        .datasheet .menu .content .node .img {\n          position: absolute;\n          left: 0;\n          top: 0;\n          width: 30%;\n          background-repeat: no-repeat;\n          background-origin: padding-box;\n          background-color: red;\n          /*padding-bottom:10%;*/ }\n          .datasheet .menu .content .node .img.skew {\n            transform: skew(-60deg, 33deg) scale(0.5, 0.3);\n            background-size: 66%;\n            background-repeat: repeat; }\n          .datasheet .menu .content .node .img:before {\n            content: \"\";\n            display: block;\n            padding-top: 100%; }\n    .datasheet .menu:after {\n      content: \"\";\n      display: table;\n      clear: both; }\n", "",{"version":3,"sources":["E:/X64BACKUP/desktop/kiwi/src/lib/interface/src/lib/interface/DataSheet.scss"],"names":[],"mappings":"AAAA;EAEC,WAAW;EAEX,kBAAkB;EAClB,SAAS;EACT,QAAO;EAEP,YAAY;EAEZ,gBAAgB;EAChB,WAAU;EACV,iBAAgB;EAEhB,cAAa,EAAA;EAdd;IAkBE,aAAa,EAAA;EAlBf;IAsBE,mBAAmB;IACnB,gBAAgB;IAChB,UAAU;IACV,kBAAkB,EAAA;EAzBpB;IA6BE,kBAAiB;IACjB,UAAU;IACV,YAAY,EAAA;EA/Bd;IAoCE,WAAW;IACX,kBAAiB,EAAA;IArCnB;MAyCG,kBAAiB;MACjB,UAAU;MACV,SAAQ;MACR,SAAQ,EAAA;MA5CX;QAgDI,OAAO,EAAA;MAhDX;QAmDI,QACD,EAAA;IApDH;MAyDG,kBAAkB;MAClB,iBAAiB,EAAA;MA1DpB;QA4DI,cAAc,EAAA;IA5DlB;MAkEG,iBAAiB;MAEjB,kBAAiB;MACjB,gBAAgB;MAChB,oBAAoB,EAAA;MAtEvB;QAyEI,kBAAiB;QACjB,WAAW;QACX,YAAY;QACZ,UAAU;QAEV,iBAAgB;QAEhB,qBAAqB,EAAA;QAhFzB;UAmFK,iBAAgB;UAChB,sBAAqB;UACrB,gBAAgB;UAChB,YAAY;UACZ,sBAAqB;UACrB,UAAU;UACV,gBAAe,EAAA;QAzFpB;UA+FK,kBAAiB;UACjB,OAAO;UACP,MAAM;UACN,UAAU;UACV,4BAA2B;UAC3B,8BAA6B;UAC7B,qBAAoB;UAEpB,sBAAA,EAAuB;UAvG5B;YA2GM,8CAA6C;YAC7C,oBAAmB;YACnB,yBAAwB,EAAA;UA7G9B;YAiHM,WAAW;YACX,cAAc;YACd,iBAAgB,EAAA;IAnHtB;MAgIM,WAAW;MACX,cAAc;MACd,WAAW,EAAA","file":"DataSheet.scss","sourcesContent":[".datasheet{\r\n\t\r\n\tz-index: 10;\r\n\r\n\tposition: absolute;\r\n\tleft: 1em;\r\n\ttop:1em;\r\n\t\r\n\twidth: 400px;\r\n\r\n\tfont-size: 1.2em;\r\n\tcolor:#333;\r\n\tbackground:white;\r\n\r\n\tpadding:0.5em;\r\n\r\n\t\r\n\t&.hidden{\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.title{\r\n\t\tmargin: 0 1em 0 30%;\r\n\t\tfont-size: 1.1em;\r\n\t\tpadding: 0;\r\n\t\ttext-align: center;\r\n\t}\r\n\r\n\t.button{\r\n\t\tposition:absolute;\r\n\t\ttop: 0.5em;\r\n\t\tright: 0.5em;\r\n\t}\r\n\r\n\r\n\t.menu{\r\n\t\twidth: 100%;\r\n\t\tposition:relative;\r\n\t\t\r\n\t\t.button{\r\n\r\n\t\t\tposition:absolute;\r\n\t\t\tz-index: 2;\r\n\t\t\ttop:auto;\r\n\t\t\tbottom:0;\r\n\r\n\r\n\t\t\t&:first-of-type{\r\n\t\t\t\tleft: 0;\r\n\t\t\t}\r\n\t\t\t&:last-of-type{\r\n\t\t\t\tright: 0\r\n\t\t\t}\r\n\r\n\t\t}\r\n\r\n\t\t.info{\r\n\t\t\ttext-align: center;\r\n\t\t\tfont-size: 0.70em;\r\n\t\t\tspan:first-of-type:after{\r\n\t\t\t\tcontent: \" / \";\r\n\t\t\t}\r\n\t\t}\r\n\r\n\r\n\t\t.content{\r\n\t\t\tmin-height: 300px;\r\n\t\t\t\r\n\t\t\tposition:relative;\r\n\t\t\toverflow: hidden;\r\n\t\t\tmargin-bottom: 0.5em;\r\n\r\n\t\t\t.node{\r\n\t\t\t\tposition:absolute;\r\n\t\t\t\twidth: 100%;\r\n\t\t\t\theight: 100%;\r\n\t\t\t\tleft: 100%;\r\n\r\n\t\t\t\tbackground:white;\r\n\r\n\t\t\t\ttransition: left 0.3s;\r\n\r\n\t\t\t\tp{\r\n\t\t\t\t\tmargin:0 0 0 30%;\r\n\t\t\t\t\tpadding:0.3em 0 0 1em;\r\n\t\t\t\t\tfont-size: 0.8em;\r\n\t\t\t\t\theight: 100%;\r\n\t\t\t\t\tbox-sizing:border-box;\r\n\t\t\t\t\twidth: 70%;\r\n\t\t\t\t\toverflow-y:auto;\r\n\r\n\r\n\t\t\t\t}\r\n\r\n\t\t\t\t.img{\r\n\t\t\t\t\tposition:absolute;\r\n\t\t\t\t\tleft: 0;\r\n\t\t\t\t\ttop: 0;\r\n\t\t\t\t\twidth: 30%;\r\n\t\t\t\t\tbackground-repeat:no-repeat;\r\n\t\t\t\t\tbackground-origin:padding-box;\r\n\t\t\t\t\tbackground-color:red;\r\n\r\n\t\t\t\t\t/*padding-bottom:10%;*/\r\n\t\t\t\t\t\r\n\r\n\t\t\t\t\t&.skew{\r\n\t\t\t\t\t\ttransform: skew(-60deg,33deg) scale(0.5, 0.3);\r\n\t\t\t\t\t\tbackground-size:66%;\r\n\t\t\t\t\t\tbackground-repeat:repeat;\r\n\t\t\t\t\t}\r\n\r\n\t\t\t\t\t&:before{\r\n\t\t\t\t\t\tcontent: \"\";\r\n\t\t\t\t\t\tdisplay: block;\r\n\t\t\t\t\t\tpadding-top:100%;\r\n\t\t\t\t\t}\r\n\t\t\t\t\t\r\n\r\n\t\t\t\t}\r\n\r\n\r\n\r\n\t\t\t}\r\n\r\n\t\t}\r\n\r\n\t\t&:after {\r\n\t\t    content: \"\";\r\n\t\t    display: table;\r\n\t\t    clear: both;\r\n\t\t}\r\n\r\n\t}\r\n\r\n\r\n\t\r\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/Interface.scss":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2!./src/lib/interface/Interface.scss ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".interface {\n  position: absolute;\n  background-color: rgba(0, 100, 255, 0.5);\n  right: 0;\n  bottom: 0;\n  box-sizing: border-box;\n  height: auto;\n  width: 100%;\n  overflow: auto; }\n  .interface .group {\n    background-color: lightgray;\n    display: inline-block;\n    margin: 0.1em; }\n    .interface .group h2 {\n      margin: 0;\n      text-align: center; }\n    .interface .group .button {\n      width: 5em;\n      height: 5em;\n      float: left;\n      cursor: pointer;\n      background-color: white;\n      background-position: center center;\n      background-size: contain;\n      background-repeat: no-repeat; }\n      .interface .group .button:hover {\n        background-color: #444; }\n      .interface .group .button.selected {\n        background-color: black; }\n    .interface .group:after {\n      content: \"\";\n      display: table;\n      clear: both; }\n", "",{"version":3,"sources":["E:/X64BACKUP/desktop/kiwi/src/lib/interface/src/lib/interface/Interface.scss"],"names":[],"mappings":"AAAA;EAEC,kBAAkB;EAClB,wCAAqC;EACrC,QAAQ;EACR,SAAQ;EAER,sBAAqB;EAErB,YAAY;EACZ,WAAW;EAEX,cAAc,EAAA;EAZf;IAiBE,2BAA0B;IAC1B,qBAAqB;IACrB,aAAa,EAAA;IAnBf;MAsBG,SAAS;MACT,kBAAkB,EAAA;IAvBrB;MA6BG,UAAU;MACV,WAAW;MAEX,WAAW;MAEX,eAAe;MAGf,uBAAsB;MACtB,kCAAkC;MAClC,wBAAuB;MACvB,4BAA4B,EAAA;MAxC/B;QA2CI,sBAAqB,EAAA;MA3CzB;QA+CI,uBAAsB,EAAA;IA/C1B;MAyDM,WAAW;MACX,cAAc;MACd,WAAW,EAAA","file":"Interface.scss","sourcesContent":[".interface{\r\n\r\n\tposition: absolute;\r\n\tbackground-color: rgba(0,100,255,0.5);\r\n\tright: 0;\r\n\tbottom:0;\r\n\r\n\tbox-sizing:border-box;\r\n\t\r\n\theight: auto;\r\n\twidth: 100%;\r\n\r\n\toverflow: auto;\r\n\t\r\n\r\n\t.group{\r\n\r\n\t\tbackground-color:lightgray;\r\n\t\tdisplay: inline-block;\r\n\t\tmargin: 0.1em;\r\n\r\n\t\th2{\r\n\t\t\tmargin: 0;\r\n\t\t\ttext-align: center;\r\n\t\t}\r\n\r\n\r\n\t\t.button{\r\n\r\n\t\t\twidth: 5em;\r\n\t\t\theight: 5em;\r\n\r\n\t\t\tfloat: left;\r\n\r\n\t\t\tcursor: pointer;\r\n\r\n\r\n\t\t\tbackground-color:white;\r\n\t\t\tbackground-position: center center;\r\n\t\t\tbackground-size:contain;\r\n\t\t\tbackground-repeat: no-repeat;\r\n\r\n\t\t\t&:hover{\r\n\t\t\t\tbackground-color:#444;\r\n\t\t\t}\r\n\r\n\t\t\t&.selected{\r\n\t\t\t\tbackground-color:black;\r\n\t\t\t}\r\n\r\n\r\n\t\t\t\r\n\r\n\t\t}\r\n\r\n\r\n\t\t&:after {\r\n\t\t    content: \"\";\r\n\t\t    display: table;\r\n\t\t    clear: both;\r\n\t\t}\r\n\r\n\t}\r\n\r\n\t\r\n\r\n}\r\n\r\n\r\n"],"sourceRoot":""}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/KiwiActionPanel.scss":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--5-1!./node_modules/sass-loader/lib/loader.js??ref--5-2!./src/lib/interface/KiwiActionPanel.scss ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, ".action-panel {\n  z-index: 10;\n  position: absolute;\n  right: 1em;\n  top: 1em;\n  width: 400px;\n  padding: 0.5em;\n  font-size: 1.2em;\n  color: #333;\n  background: orange; }\n  .action-panel.hidden {\n    display: none; }\n  .action-panel .title {\n    margin: 0 1em 0 30%;\n    font-size: 1.1em;\n    padding: 0;\n    text-align: center; }\n  .action-panel .button {\n    position: absolute;\n    top: 0.5em;\n    right: 0.5em; }\n", "",{"version":3,"sources":["E:/X64BACKUP/desktop/kiwi/src/lib/interface/src/lib/interface/KiwiActionPanel.scss"],"names":[],"mappings":"AAAA;EAEC,WAAW;EAEX,kBAAkB;EAClB,UAAU;EACV,QAAQ;EAER,YAAY;EACZ,cAAa;EAGb,gBAAgB;EAChB,WAAU;EAEV,kBAAkB,EAAA;EAfnB;IAmBE,aAAa,EAAA;EAnBf;IAuBE,mBAAmB;IACnB,gBAAgB;IAChB,UAAU;IACV,kBAAkB,EAAA;EA1BpB;IA8BE,kBAAiB;IACjB,UAAU;IACV,YAAY,EAAA","file":"KiwiActionPanel.scss","sourcesContent":[".action-panel{\r\n\r\n\tz-index: 10;\r\n\r\n\tposition: absolute;\r\n\tright: 1em;\r\n\ttop: 1em;\r\n\r\n\twidth: 400px;\r\n\tpadding:0.5em;\r\n\t\r\n\r\n\tfont-size: 1.2em;\r\n\tcolor:#333;\r\n\r\n\tbackground: orange;\r\n\r\n\r\n\t&.hidden{\r\n\t\tdisplay: none;\r\n\t}\r\n\r\n\t.title{\r\n\t\tmargin: 0 1em 0 30%;\r\n\t\tfont-size: 1.1em;\r\n\t\tpadding: 0;\r\n\t\ttext-align: center;\r\n\t}\r\n\r\n\t.button{\r\n\t\tposition:absolute;\r\n\t\ttop: 0.5em;\r\n\t\tright: 0.5em;\r\n\t}\r\n\r\n\r\n\r\n\t\r\n}"],"sourceRoot":""}]);



/***/ }),

/***/ "./src/assets/fonts/fonts.scss":
/*!*************************************!*\
  !*** ./src/assets/fonts/fonts.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./fonts.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/fonts/fonts.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./fonts.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/fonts/fonts.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./fonts.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/assets/fonts/fonts.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/assets/img/destroy.png":
/*!************************************!*\
  !*** ./src/assets/img/destroy.png ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/destroy.png";

/***/ }),

/***/ "./src/assets/img/paper.jpg":
/*!**********************************!*\
  !*** ./src/assets/img/paper.jpg ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/paper.jpg";

/***/ }),

/***/ "./src/assets/img/textures/Textures.js":
/*!*********************************************!*\
  !*** ./src/assets/img/textures/Textures.js ***!
  \*********************************************/
/*! exports provided: Textures, GhostTile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Textures", function() { return Textures; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GhostTile", function() { return GhostTile; });
/* harmony import */ var _surface_grass_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./surface_grass.png */ "./src/assets/img/textures/surface_grass.png");
/* harmony import */ var _surface_grass_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_surface_grass_png__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _surface_water_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./surface_water.png */ "./src/assets/img/textures/surface_water.png");
/* harmony import */ var _surface_water_png__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_surface_water_png__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _surface_sand_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./surface_sand.png */ "./src/assets/img/textures/surface_sand.png");
/* harmony import */ var _surface_sand_png__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_surface_sand_png__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _surface_stone_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./surface_stone.png */ "./src/assets/img/textures/surface_stone.png");
/* harmony import */ var _surface_stone_png__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_surface_stone_png__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _surface_dirt_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./surface_dirt.png */ "./src/assets/img/textures/surface_dirt.png");
/* harmony import */ var _surface_dirt_png__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_surface_dirt_png__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _road_pier_start_top_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./road_pier_start_top.png */ "./src/assets/img/textures/road_pier_start_top.png");
/* harmony import */ var _road_pier_start_top_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_road_pier_start_top_png__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _road_pier_start_right_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./road_pier_start_right.png */ "./src/assets/img/textures/road_pier_start_right.png");
/* harmony import */ var _road_pier_start_right_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_road_pier_start_right_png__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _road_pier_start_bottom_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./road_pier_start_bottom.png */ "./src/assets/img/textures/road_pier_start_bottom.png");
/* harmony import */ var _road_pier_start_bottom_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_road_pier_start_bottom_png__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _road_pier_start_left_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./road_pier_start_left.png */ "./src/assets/img/textures/road_pier_start_left.png");
/* harmony import */ var _road_pier_start_left_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_road_pier_start_left_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _road_pier_build_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./road_pier_build.png */ "./src/assets/img/textures/road_pier_build.png");
/* harmony import */ var _road_pier_build_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_road_pier_build_png__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _road_pier_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./road_pier.png */ "./src/assets/img/textures/road_pier.png");
/* harmony import */ var _road_pier_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_road_pier_png__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _road_sand_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./road_sand.png */ "./src/assets/img/textures/road_sand.png");
/* harmony import */ var _road_sand_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_road_sand_png__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _road_stone_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./road_stone.png */ "./src/assets/img/textures/road_stone.png");
/* harmony import */ var _road_stone_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_road_stone_png__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _fence_low_wood_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fence_low_wood.png */ "./src/assets/img/textures/fence_low_wood.png");
/* harmony import */ var _fence_low_wood_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_fence_low_wood_png__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _fence_high_wood_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fence_high_wood.png */ "./src/assets/img/textures/fence_high_wood.png");
/* harmony import */ var _fence_high_wood_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_fence_high_wood_png__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _kiwi_default_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./kiwi_default.png */ "./src/assets/img/textures/kiwi_default.png");
/* harmony import */ var _kiwi_default_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_kiwi_default_png__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _kiwi_default_shadow_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./kiwi_default_shadow.png */ "./src/assets/img/textures/kiwi_default_shadow.png");
/* harmony import */ var _kiwi_default_shadow_png__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_kiwi_default_shadow_png__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _build_palmtree_with_hut_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./build_palmtree_with_hut.png */ "./src/assets/img/textures/build_palmtree_with_hut.png");
/* harmony import */ var _build_palmtree_with_hut_png__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_build_palmtree_with_hut_png__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _build_palmtree_with_hut_surface_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./build_palmtree_with_hut_surface.png */ "./src/assets/img/textures/build_palmtree_with_hut_surface.png");
/* harmony import */ var _build_palmtree_with_hut_surface_png__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_build_palmtree_with_hut_surface_png__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _build_palmtree_4_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./build_palmtree_4.png */ "./src/assets/img/textures/build_palmtree_4.png");
/* harmony import */ var _build_palmtree_4_png__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_build_palmtree_4_png__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _build_palmtree_3_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./build_palmtree_3.png */ "./src/assets/img/textures/build_palmtree_3.png");
/* harmony import */ var _build_palmtree_3_png__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_build_palmtree_3_png__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _build_palmtree_2_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./build_palmtree_2.png */ "./src/assets/img/textures/build_palmtree_2.png");
/* harmony import */ var _build_palmtree_2_png__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_build_palmtree_2_png__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _build_palmtree_1_png__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./build_palmtree_1.png */ "./src/assets/img/textures/build_palmtree_1.png");
/* harmony import */ var _build_palmtree_1_png__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_build_palmtree_1_png__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _build_small_forest_png__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./build_small_forest.png */ "./src/assets/img/textures/build_small_forest.png");
/* harmony import */ var _build_small_forest_png__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_build_small_forest_png__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _build_catapult_2_png__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./build_catapult_2.png */ "./src/assets/img/textures/build_catapult_2.png");
/* harmony import */ var _build_catapult_2_png__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_build_catapult_2_png__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _build_catapult_2_surface_png__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./build_catapult_2_surface.png */ "./src/assets/img/textures/build_catapult_2_surface.png");
/* harmony import */ var _build_catapult_2_surface_png__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_build_catapult_2_surface_png__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _build_catapult_1_png__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./build_catapult_1.png */ "./src/assets/img/textures/build_catapult_1.png");
/* harmony import */ var _build_catapult_1_png__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_build_catapult_1_png__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _build_catapult_1_surface_png__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./build_catapult_1_surface.png */ "./src/assets/img/textures/build_catapult_1_surface.png");
/* harmony import */ var _build_catapult_1_surface_png__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_build_catapult_1_surface_png__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _build_defense_tree_dark_3_png__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./build_defense_tree_dark_3.png */ "./src/assets/img/textures/build_defense_tree_dark_3.png");
/* harmony import */ var _build_defense_tree_dark_3_png__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_build_defense_tree_dark_3_png__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _build_defense_tree_dark_2_png__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./build_defense_tree_dark_2.png */ "./src/assets/img/textures/build_defense_tree_dark_2.png");
/* harmony import */ var _build_defense_tree_dark_2_png__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_build_defense_tree_dark_2_png__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _build_defense_tree_dark_1_png__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./build_defense_tree_dark_1.png */ "./src/assets/img/textures/build_defense_tree_dark_1.png");
/* harmony import */ var _build_defense_tree_dark_1_png__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_build_defense_tree_dark_1_png__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _build_defense_tree_1_png__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./build_defense_tree_1.png */ "./src/assets/img/textures/build_defense_tree_1.png");
/* harmony import */ var _build_defense_tree_1_png__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_build_defense_tree_1_png__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _build_defense_tree_2_png__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./build_defense_tree_2.png */ "./src/assets/img/textures/build_defense_tree_2.png");
/* harmony import */ var _build_defense_tree_2_png__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_build_defense_tree_2_png__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _build_volcano_png__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./build_volcano.png */ "./src/assets/img/textures/build_volcano.png");
/* harmony import */ var _build_volcano_png__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_build_volcano_png__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _build_volcano_surface_png__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./build_volcano_surface.png */ "./src/assets/img/textures/build_volcano_surface.png");
/* harmony import */ var _build_volcano_surface_png__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_build_volcano_surface_png__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _build_tiny_island_png__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./build_tiny_island.png */ "./src/assets/img/textures/build_tiny_island.png");
/* harmony import */ var _build_tiny_island_png__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_build_tiny_island_png__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _build_tiny_island_surface_png__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./build_tiny_island_surface.png */ "./src/assets/img/textures/build_tiny_island_surface.png");
/* harmony import */ var _build_tiny_island_surface_png__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_build_tiny_island_surface_png__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _build_vinyard_png__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./build_vinyard.png */ "./src/assets/img/textures/build_vinyard.png");
/* harmony import */ var _build_vinyard_png__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_build_vinyard_png__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _build_vinyard_surface_png__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./build_vinyard_surface.png */ "./src/assets/img/textures/build_vinyard_surface.png");
/* harmony import */ var _build_vinyard_surface_png__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_build_vinyard_surface_png__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var _build_lake_2_png__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./build_lake_2.png */ "./src/assets/img/textures/build_lake_2.png");
/* harmony import */ var _build_lake_2_png__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(_build_lake_2_png__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _build_lake_1_png__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./build_lake_1.png */ "./src/assets/img/textures/build_lake_1.png");
/* harmony import */ var _build_lake_1_png__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(_build_lake_1_png__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _build_lake_1_surface_png__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./build_lake_1_surface.png */ "./src/assets/img/textures/build_lake_1_surface.png");
/* harmony import */ var _build_lake_1_surface_png__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(_build_lake_1_surface_png__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var _build_red_tent_png__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./build_red_tent.png */ "./src/assets/img/textures/build_red_tent.png");
/* harmony import */ var _build_red_tent_png__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(_build_red_tent_png__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var _build_dark_hut_1_png__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./build_dark_hut_1.png */ "./src/assets/img/textures/build_dark_hut_1.png");
/* harmony import */ var _build_dark_hut_1_png__WEBPACK_IMPORTED_MODULE_43___default = /*#__PURE__*/__webpack_require__.n(_build_dark_hut_1_png__WEBPACK_IMPORTED_MODULE_43__);
/* harmony import */ var _build_dark_hut_2_png__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./build_dark_hut_2.png */ "./src/assets/img/textures/build_dark_hut_2.png");
/* harmony import */ var _build_dark_hut_2_png__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(_build_dark_hut_2_png__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var _build_dark_hut_3_png__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./build_dark_hut_3.png */ "./src/assets/img/textures/build_dark_hut_3.png");
/* harmony import */ var _build_dark_hut_3_png__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(_build_dark_hut_3_png__WEBPACK_IMPORTED_MODULE_45__);
/* harmony import */ var _build_temple_png__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./build_temple.png */ "./src/assets/img/textures/build_temple.png");
/* harmony import */ var _build_temple_png__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(_build_temple_png__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var _build_berries_blue_png__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./build_berries_blue.png */ "./src/assets/img/textures/build_berries_blue.png");
/* harmony import */ var _build_berries_blue_png__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(_build_berries_blue_png__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var _build_berries_red_png__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./build_berries_red.png */ "./src/assets/img/textures/build_berries_red.png");
/* harmony import */ var _build_berries_red_png__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(_build_berries_red_png__WEBPACK_IMPORTED_MODULE_48__);
/* harmony import */ var _build_quarry_png__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./build_quarry.png */ "./src/assets/img/textures/build_quarry.png");
/* harmony import */ var _build_quarry_png__WEBPACK_IMPORTED_MODULE_49___default = /*#__PURE__*/__webpack_require__.n(_build_quarry_png__WEBPACK_IMPORTED_MODULE_49__);
/* harmony import */ var _build_farm_png__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./build_farm.png */ "./src/assets/img/textures/build_farm.png");
/* harmony import */ var _build_farm_png__WEBPACK_IMPORTED_MODULE_50___default = /*#__PURE__*/__webpack_require__.n(_build_farm_png__WEBPACK_IMPORTED_MODULE_50__);
/* harmony import */ var _build_farm_surface_png__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./build_farm_surface.png */ "./src/assets/img/textures/build_farm_surface.png");
/* harmony import */ var _build_farm_surface_png__WEBPACK_IMPORTED_MODULE_51___default = /*#__PURE__*/__webpack_require__.n(_build_farm_surface_png__WEBPACK_IMPORTED_MODULE_51__);
/* harmony import */ var _build_flowers_1_png__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./build_flowers_1.png */ "./src/assets/img/textures/build_flowers_1.png");
/* harmony import */ var _build_flowers_1_png__WEBPACK_IMPORTED_MODULE_52___default = /*#__PURE__*/__webpack_require__.n(_build_flowers_1_png__WEBPACK_IMPORTED_MODULE_52__);
/* harmony import */ var _build_flowers_1_surface_png__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./build_flowers_1_surface.png */ "./src/assets/img/textures/build_flowers_1_surface.png");
/* harmony import */ var _build_flowers_1_surface_png__WEBPACK_IMPORTED_MODULE_53___default = /*#__PURE__*/__webpack_require__.n(_build_flowers_1_surface_png__WEBPACK_IMPORTED_MODULE_53__);
/* harmony import */ var _build_school_png__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./build_school.png */ "./src/assets/img/textures/build_school.png");
/* harmony import */ var _build_school_png__WEBPACK_IMPORTED_MODULE_54___default = /*#__PURE__*/__webpack_require__.n(_build_school_png__WEBPACK_IMPORTED_MODULE_54__);
/* harmony import */ var _build_school_surface_png__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./build_school_surface.png */ "./src/assets/img/textures/build_school_surface.png");
/* harmony import */ var _build_school_surface_png__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(_build_school_surface_png__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var _build_hut_with_garden_5_png__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./build_hut_with_garden_5.png */ "./src/assets/img/textures/build_hut_with_garden_5.png");
/* harmony import */ var _build_hut_with_garden_5_png__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_5_png__WEBPACK_IMPORTED_MODULE_56__);
/* harmony import */ var _build_hut_with_garden_5_surface_png__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./build_hut_with_garden_5_surface.png */ "./src/assets/img/textures/build_hut_with_garden_5_surface.png");
/* harmony import */ var _build_hut_with_garden_5_surface_png__WEBPACK_IMPORTED_MODULE_57___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_5_surface_png__WEBPACK_IMPORTED_MODULE_57__);
/* harmony import */ var _build_hut_with_garden_6_surface_png__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./build_hut_with_garden_6_surface.png */ "./src/assets/img/textures/build_hut_with_garden_6_surface.png");
/* harmony import */ var _build_hut_with_garden_6_surface_png__WEBPACK_IMPORTED_MODULE_58___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_6_surface_png__WEBPACK_IMPORTED_MODULE_58__);
/* harmony import */ var _build_hut_with_garden_6_png__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./build_hut_with_garden_6.png */ "./src/assets/img/textures/build_hut_with_garden_6.png");
/* harmony import */ var _build_hut_with_garden_6_png__WEBPACK_IMPORTED_MODULE_59___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_6_png__WEBPACK_IMPORTED_MODULE_59__);
/* harmony import */ var _build_hut_with_garden_4_png__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./build_hut_with_garden_4.png */ "./src/assets/img/textures/build_hut_with_garden_4.png");
/* harmony import */ var _build_hut_with_garden_4_png__WEBPACK_IMPORTED_MODULE_60___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_4_png__WEBPACK_IMPORTED_MODULE_60__);
/* harmony import */ var _build_hut_with_garden_3_png__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./build_hut_with_garden_3.png */ "./src/assets/img/textures/build_hut_with_garden_3.png");
/* harmony import */ var _build_hut_with_garden_3_png__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_3_png__WEBPACK_IMPORTED_MODULE_61__);
/* harmony import */ var _build_hut_with_garden_3_surface_png__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./build_hut_with_garden_3_surface.png */ "./src/assets/img/textures/build_hut_with_garden_3_surface.png");
/* harmony import */ var _build_hut_with_garden_3_surface_png__WEBPACK_IMPORTED_MODULE_62___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_3_surface_png__WEBPACK_IMPORTED_MODULE_62__);
/* harmony import */ var _build_hut_with_garden_2_png__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./build_hut_with_garden_2.png */ "./src/assets/img/textures/build_hut_with_garden_2.png");
/* harmony import */ var _build_hut_with_garden_2_png__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_2_png__WEBPACK_IMPORTED_MODULE_63__);
/* harmony import */ var _build_hut_with_garden_2_surface_png__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./build_hut_with_garden_2_surface.png */ "./src/assets/img/textures/build_hut_with_garden_2_surface.png");
/* harmony import */ var _build_hut_with_garden_2_surface_png__WEBPACK_IMPORTED_MODULE_64___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_2_surface_png__WEBPACK_IMPORTED_MODULE_64__);
/* harmony import */ var _build_hut_with_garden_1_png__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./build_hut_with_garden_1.png */ "./src/assets/img/textures/build_hut_with_garden_1.png");
/* harmony import */ var _build_hut_with_garden_1_png__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_1_png__WEBPACK_IMPORTED_MODULE_65__);
/* harmony import */ var _build_hut_with_garden_1_surface_png__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./build_hut_with_garden_1_surface.png */ "./src/assets/img/textures/build_hut_with_garden_1_surface.png");
/* harmony import */ var _build_hut_with_garden_1_surface_png__WEBPACK_IMPORTED_MODULE_66___default = /*#__PURE__*/__webpack_require__.n(_build_hut_with_garden_1_surface_png__WEBPACK_IMPORTED_MODULE_66__);
/* harmony import */ var _build_fire_1_png__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./build_fire_1.png */ "./src/assets/img/textures/build_fire_1.png");
/* harmony import */ var _build_fire_1_png__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(_build_fire_1_png__WEBPACK_IMPORTED_MODULE_67__);
/* harmony import */ var _build_fire_1_surface_png__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./build_fire_1_surface.png */ "./src/assets/img/textures/build_fire_1_surface.png");
/* harmony import */ var _build_fire_1_surface_png__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(_build_fire_1_surface_png__WEBPACK_IMPORTED_MODULE_68__);
/* harmony import */ var _build_hut_2_png__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./build_hut_2.png */ "./src/assets/img/textures/build_hut_2.png");
/* harmony import */ var _build_hut_2_png__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(_build_hut_2_png__WEBPACK_IMPORTED_MODULE_69__);
/* harmony import */ var _build_hut_2_surface_png__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./build_hut_2_surface.png */ "./src/assets/img/textures/build_hut_2_surface.png");
/* harmony import */ var _build_hut_2_surface_png__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(_build_hut_2_surface_png__WEBPACK_IMPORTED_MODULE_70__);
/* harmony import */ var _build_hut_1_png__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./build_hut_1.png */ "./src/assets/img/textures/build_hut_1.png");
/* harmony import */ var _build_hut_1_png__WEBPACK_IMPORTED_MODULE_71___default = /*#__PURE__*/__webpack_require__.n(_build_hut_1_png__WEBPACK_IMPORTED_MODULE_71__);
/* harmony import */ var _build_hut_1_surface_png__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./build_hut_1_surface.png */ "./src/assets/img/textures/build_hut_1_surface.png");
/* harmony import */ var _build_hut_1_surface_png__WEBPACK_IMPORTED_MODULE_72___default = /*#__PURE__*/__webpack_require__.n(_build_hut_1_surface_png__WEBPACK_IMPORTED_MODULE_72__);
/* harmony import */ var _build_pine_2_png__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./build_pine_2.png */ "./src/assets/img/textures/build_pine_2.png");
/* harmony import */ var _build_pine_2_png__WEBPACK_IMPORTED_MODULE_73___default = /*#__PURE__*/__webpack_require__.n(_build_pine_2_png__WEBPACK_IMPORTED_MODULE_73__);
/* harmony import */ var _build_fruit_tree_png__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./build_fruit_tree.png */ "./src/assets/img/textures/build_fruit_tree.png");
/* harmony import */ var _build_fruit_tree_png__WEBPACK_IMPORTED_MODULE_74___default = /*#__PURE__*/__webpack_require__.n(_build_fruit_tree_png__WEBPACK_IMPORTED_MODULE_74__);
/* harmony import */ var _build_waterwell_png__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./build_waterwell.png */ "./src/assets/img/textures/build_waterwell.png");
/* harmony import */ var _build_waterwell_png__WEBPACK_IMPORTED_MODULE_75___default = /*#__PURE__*/__webpack_require__.n(_build_waterwell_png__WEBPACK_IMPORTED_MODULE_75__);
/* harmony import */ var _build_castle_png__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./build_castle.png */ "./src/assets/img/textures/build_castle.png");
/* harmony import */ var _build_castle_png__WEBPACK_IMPORTED_MODULE_76___default = /*#__PURE__*/__webpack_require__.n(_build_castle_png__WEBPACK_IMPORTED_MODULE_76__);
/* harmony import */ var _build_castle_surface_png__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./build_castle_surface.png */ "./src/assets/img/textures/build_castle_surface.png");
/* harmony import */ var _build_castle_surface_png__WEBPACK_IMPORTED_MODULE_77___default = /*#__PURE__*/__webpack_require__.n(_build_castle_surface_png__WEBPACK_IMPORTED_MODULE_77__);
/* harmony import */ var _build_pine_1_png__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./build_pine_1.png */ "./src/assets/img/textures/build_pine_1.png");
/* harmony import */ var _build_pine_1_png__WEBPACK_IMPORTED_MODULE_78___default = /*#__PURE__*/__webpack_require__.n(_build_pine_1_png__WEBPACK_IMPORTED_MODULE_78__);
/* harmony import */ var _build_pine_1_surface_png__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./build_pine_1_surface.png */ "./src/assets/img/textures/build_pine_1_surface.png");
/* harmony import */ var _build_pine_1_surface_png__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(_build_pine_1_surface_png__WEBPACK_IMPORTED_MODULE_79__);
















































































var GhostTile = {
  size: [3, 3],
  modulo: true
};
var Textures = {
  surface: {
    grass: {
      modulo: true,
      skewX: true,
      skewY: true,
      size: [3, 3],
      surface: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _surface_grass_png__WEBPACK_IMPORTED_MODULE_0___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 512,
            height: 512
          }
        }
      },
      type: 'surface',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 512
      }
    },
    water: {
      modulo: true,
      skewX: true,
      skewY: true,
      size: [3, 3],
      surface: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _surface_water_png__WEBPACK_IMPORTED_MODULE_1___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 512,
            height: 512
          }
        }
      },
      type: 'surface',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 512
      }
    },
    sand: {
      modulo: true,
      skewX: true,
      skewY: true,
      size: [3, 3],
      surface: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _surface_sand_png__WEBPACK_IMPORTED_MODULE_2___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 512,
            height: 512
          }
        }
      },
      type: 'surface',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 512
      }
    },
    stone: {
      modulo: true,
      skewX: true,
      skewY: true,
      size: [3, 3],
      surface: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _surface_stone_png__WEBPACK_IMPORTED_MODULE_3___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 512,
            height: 512
          }
        }
      },
      type: 'surface',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 512
      }
    },
    dirt: {
      modulo: true,
      skewX: true,
      skewY: true,
      size: [3, 3],
      surface: '',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _surface_dirt_png__WEBPACK_IMPORTED_MODULE_4___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 512,
            height: 512
          }
        }
      },
      type: 'surface',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 512
      }
    }
  },
  road: {
    pier: {
      modulo: false,
      skewX: true,
      skewY: true,
      size: [1, 1],
      surface: 'water|beach|lake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        start_top: {
          url: _road_pier_start_top_png__WEBPACK_IMPORTED_MODULE_5___default.a,
          trim: {
            left: 0,
            top: 45,
            width: 126,
            height: 51
          }
        },
        start_right: {
          url: _road_pier_start_right_png__WEBPACK_IMPORTED_MODULE_6___default.a,
          trim: {
            left: 0,
            top: 41,
            width: 128,
            height: 55
          }
        },
        start_bottom: {
          url: _road_pier_start_bottom_png__WEBPACK_IMPORTED_MODULE_7___default.a,
          trim: {
            left: 0,
            top: 11,
            width: 125,
            height: 117
          }
        },
        start_left: {
          url: _road_pier_start_left_png__WEBPACK_IMPORTED_MODULE_8___default.a,
          trim: {
            left: 0,
            top: 11,
            width: 128,
            height: 117
          }
        },
        build: {
          url: _road_pier_build_png__WEBPACK_IMPORTED_MODULE_9___default.a,
          trim: {
            left: 0,
            top: 5,
            width: 128,
            height: 113
          }
        },
        main: {
          url: _road_pier_png__WEBPACK_IMPORTED_MODULE_10___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 128,
            height: 128
          }
        }
      },
      type: 'road',
      orig: {
        left: 0,
        top: 0,
        width: 128,
        height: 128
      },
      crop: false,
      cutoff: 78
    },
    sand: {
      modulo: false,
      skewX: true,
      skewY: true,
      size: [1, 1],
      surface: '!water|lake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _road_sand_png__WEBPACK_IMPORTED_MODULE_11___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 128,
            height: 128
          }
        }
      },
      type: 'road',
      orig: {
        left: 0,
        top: 0,
        width: 128,
        height: 128
      },
      crop: true
    },
    stone: {
      modulo: false,
      skewX: true,
      skewY: true,
      size: [1, 1],
      surface: '!water|lake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _road_stone_png__WEBPACK_IMPORTED_MODULE_12___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 128,
            height: 128
          }
        }
      },
      type: 'road',
      orig: {
        left: 0,
        top: 0,
        width: 128,
        height: 128
      },
      crop: true
    }
  },
  fence: {
    low_wood: {
      modulo: false,
      skewX: false,
      skewY: true,
      size: [1, 1],
      surface: '!water|lake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _fence_low_wood_png__WEBPACK_IMPORTED_MODULE_13___default.a,
          trim: {
            left: 0,
            top: 328,
            width: 256,
            height: 179
          }
        }
      },
      type: 'fence',
      orig: {
        left: 0,
        top: 0,
        width: 256,
        height: 512
      }
    },
    high_wood: {
      modulo: false,
      skewX: false,
      skewY: true,
      size: [1, 1],
      surface: '!water|lake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _fence_high_wood_png__WEBPACK_IMPORTED_MODULE_14___default.a,
          trim: {
            left: 0,
            top: 112,
            width: 256,
            height: 400
          }
        }
      },
      type: 'fence',
      orig: {
        left: 0,
        top: 0,
        width: 256,
        height: 512
      }
    }
  },
  kiwi: {
    default: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!kiwi',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _kiwi_default_png__WEBPACK_IMPORTED_MODULE_15___default.a,
          trim: {
            left: 121,
            top: 43,
            width: 371,
            height: 339
          }
        },
        shadow: {
          url: _kiwi_default_shadow_png__WEBPACK_IMPORTED_MODULE_16___default.a,
          trim: {
            left: 139,
            top: 246,
            width: 234,
            height: 190
          }
        }
      },
      type: 'kiwi',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 512
      },
      cutoff: 375
    }
  },
  build: {
    palmtree_with_hut: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_palmtree_with_hut_png__WEBPACK_IMPORTED_MODULE_17___default.a,
          trim: {
            left: 2,
            top: 227,
            width: 510,
            height: 240
          }
        },
        surface: {
          url: _build_palmtree_with_hut_surface_png__WEBPACK_IMPORTED_MODULE_18___default.a,
          trim: {
            left: 6,
            top: 175,
            width: 494,
            height: 376
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 450
    },
    palmtree_4: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_palmtree_4_png__WEBPACK_IMPORTED_MODULE_19___default.a,
          trim: {
            left: 38,
            top: 57,
            width: 459,
            height: 471
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 500
    },
    palmtree_3: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_palmtree_3_png__WEBPACK_IMPORTED_MODULE_20___default.a,
          trim: {
            left: 0,
            top: 0,
            width: 478,
            height: 528
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 500
    },
    palmtree_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_palmtree_2_png__WEBPACK_IMPORTED_MODULE_21___default.a,
          trim: {
            left: 5,
            top: 46,
            width: 497,
            height: 468
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 500
    },
    palmtree_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_palmtree_1_png__WEBPACK_IMPORTED_MODULE_22___default.a,
          trim: {
            left: 57,
            top: 119,
            width: 455,
            height: 462
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 500
    },
    small_forest: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_small_forest_png__WEBPACK_IMPORTED_MODULE_23___default.a,
          trim: {
            left: 0,
            top: 194,
            width: 502,
            height: 409
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 565
    },
    catapult_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_catapult_2_png__WEBPACK_IMPORTED_MODULE_24___default.a,
          trim: {
            left: 100,
            top: 225,
            width: 135,
            height: 312
          }
        },
        surface: {
          url: _build_catapult_2_surface_png__WEBPACK_IMPORTED_MODULE_25___default.a,
          trim: {
            left: 79,
            top: 254,
            width: 379,
            height: 323
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 530
    },
    catapult_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_catapult_1_png__WEBPACK_IMPORTED_MODULE_26___default.a,
          trim: {
            left: 17,
            top: 21,
            width: 417,
            height: 560
          }
        },
        surface: {
          url: _build_catapult_1_surface_png__WEBPACK_IMPORTED_MODULE_27___default.a,
          trim: {
            left: 22,
            top: 149,
            width: 369,
            height: 456
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 565
    },
    defense_tree_dark_3: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_defense_tree_dark_3_png__WEBPACK_IMPORTED_MODULE_28___default.a,
          trim: {
            left: 102,
            top: 11,
            width: 399,
            height: 469
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 475
    },
    defense_tree_dark_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_defense_tree_dark_2_png__WEBPACK_IMPORTED_MODULE_29___default.a,
          trim: {
            left: 2,
            top: 0,
            width: 480,
            height: 474
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 475
    },
    defense_tree_dark_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_defense_tree_dark_1_png__WEBPACK_IMPORTED_MODULE_30___default.a,
          trim: {
            left: 57,
            top: 14,
            width: 451,
            height: 471
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 475
    },
    defense_tree_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_defense_tree_1_png__WEBPACK_IMPORTED_MODULE_31___default.a,
          trim: {
            left: 54,
            top: 0,
            width: 392,
            height: 544
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 525
    },
    defense_tree_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_defense_tree_2_png__WEBPACK_IMPORTED_MODULE_32___default.a,
          trim: {
            left: 56,
            top: 0,
            width: 456,
            height: 527
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 507
    },
    volcano: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [5, 5],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_volcano_png__WEBPACK_IMPORTED_MODULE_33___default.a,
          trim: {
            left: 29,
            top: 69,
            width: 449,
            height: 391
          }
        },
        surface: {
          url: _build_volcano_surface_png__WEBPACK_IMPORTED_MODULE_34___default.a,
          trim: {
            left: 20,
            top: 397,
            width: 490,
            height: 190
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 440
    },
    tiny_island: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: 'water|lake',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_tiny_island_png__WEBPACK_IMPORTED_MODULE_35___default.a,
          trim: {
            left: 174,
            top: 287,
            width: 195,
            height: 227
          }
        },
        surface: {
          url: _build_tiny_island_surface_png__WEBPACK_IMPORTED_MODULE_36___default.a,
          trim: {
            left: 84,
            top: 342,
            width: 324,
            height: 234
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 512
    },
    vinyard: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [6, 6],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_vinyard_png__WEBPACK_IMPORTED_MODULE_37___default.a,
          trim: {
            left: 3,
            top: 210,
            width: 508,
            height: 315
          }
        },
        surface: {
          url: _build_vinyard_surface_png__WEBPACK_IMPORTED_MODULE_38___default.a,
          trim: {
            left: 1,
            top: 408,
            width: 510,
            height: 194
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 495
    },
    lake_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [4, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_lake_2_png__WEBPACK_IMPORTED_MODULE_39___default.a,
          trim: {
            left: 0,
            top: 227,
            width: 434,
            height: 351
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 420
    },
    lake_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [5, 5],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_lake_1_png__WEBPACK_IMPORTED_MODULE_40___default.a,
          trim: {
            left: 50,
            top: 249,
            width: 390,
            height: 100
          }
        },
        surface: {
          url: _build_lake_1_surface_png__WEBPACK_IMPORTED_MODULE_41___default.a,
          trim: {
            left: 0,
            top: 249,
            width: 512,
            height: 364
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 360
    },
    red_tent: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_red_tent_png__WEBPACK_IMPORTED_MODULE_42___default.a,
          trim: {
            left: 63,
            top: 135,
            width: 413,
            height: 406
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 445
    },
    dark_hut_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_dark_hut_1_png__WEBPACK_IMPORTED_MODULE_43___default.a,
          trim: {
            left: 55,
            top: 19,
            width: 396,
            height: 445
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 445
    },
    dark_hut_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_dark_hut_2_png__WEBPACK_IMPORTED_MODULE_44___default.a,
          trim: {
            left: 126,
            top: 56,
            width: 333,
            height: 410
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 445
    },
    dark_hut_3: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_dark_hut_3_png__WEBPACK_IMPORTED_MODULE_45___default.a,
          trim: {
            left: 61,
            top: 166,
            width: 451,
            height: 313
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 445
    },
    temple: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [5, 5],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_temple_png__WEBPACK_IMPORTED_MODULE_46___default.a,
          trim: {
            left: 0,
            top: 81,
            width: 512,
            height: 378
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 444
    },
    berries_blue: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_berries_blue_png__WEBPACK_IMPORTED_MODULE_47___default.a,
          trim: {
            left: 63,
            top: 167,
            width: 403,
            height: 379
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 420
    },
    berries_red: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_berries_red_png__WEBPACK_IMPORTED_MODULE_48___default.a,
          trim: {
            left: 79,
            top: 286,
            width: 354,
            height: 256
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 450
    },
    quarry: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [4, 4],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_quarry_png__WEBPACK_IMPORTED_MODULE_49___default.a,
          trim: {
            left: 32,
            top: 110,
            width: 450,
            height: 391
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 465
    },
    farm: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [4, 4],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_farm_png__WEBPACK_IMPORTED_MODULE_50___default.a,
          trim: {
            left: 114,
            top: 278,
            width: 244,
            height: 156
          }
        },
        surface: {
          url: _build_farm_surface_png__WEBPACK_IMPORTED_MODULE_51___default.a,
          trim: {
            left: 67,
            top: 335,
            width: 379,
            height: 241
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 425
    },
    flowers_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_flowers_1_png__WEBPACK_IMPORTED_MODULE_52___default.a,
          trim: {
            left: 98,
            top: 261,
            width: 303,
            height: 233
          }
        },
        surface: {
          url: _build_flowers_1_surface_png__WEBPACK_IMPORTED_MODULE_53___default.a,
          trim: {
            left: 0,
            top: 271,
            width: 503,
            height: 342
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 440
    },
    school: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_school_png__WEBPACK_IMPORTED_MODULE_54___default.a,
          trim: {
            left: 38,
            top: 50,
            width: 466,
            height: 288
          }
        },
        surface: {
          url: _build_school_surface_png__WEBPACK_IMPORTED_MODULE_55___default.a,
          trim: {
            left: 12,
            top: 257,
            width: 495,
            height: 342
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 313
    },
    hut_with_garden_5: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_with_garden_5_png__WEBPACK_IMPORTED_MODULE_56___default.a,
          trim: {
            left: 144,
            top: 300,
            width: 326,
            height: 279
          }
        },
        surface: {
          url: _build_hut_with_garden_5_surface_png__WEBPACK_IMPORTED_MODULE_57___default.a,
          trim: {
            left: 67,
            top: 300,
            width: 397,
            height: 313
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 560
    },
    hut_with_garden_6: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        surface: {
          url: _build_hut_with_garden_6_surface_png__WEBPACK_IMPORTED_MODULE_58___default.a,
          trim: {
            left: 23,
            top: 370,
            width: 488,
            height: 168
          }
        },
        main: {
          url: _build_hut_with_garden_6_png__WEBPACK_IMPORTED_MODULE_59___default.a,
          trim: {
            left: 0,
            top: 68,
            width: 512,
            height: 487
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 430
    },
    hut_with_garden_4: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_with_garden_4_png__WEBPACK_IMPORTED_MODULE_60___default.a,
          trim: {
            left: 4,
            top: 108,
            width: 504,
            height: 361
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 500
    },
    hut_with_garden_3: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [4, 4],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_with_garden_3_png__WEBPACK_IMPORTED_MODULE_61___default.a,
          trim: {
            left: 13,
            top: 110,
            width: 482,
            height: 437
          }
        },
        surface: {
          url: _build_hut_with_garden_3_surface_png__WEBPACK_IMPORTED_MODULE_62___default.a,
          trim: {
            left: 13,
            top: 102,
            width: 494,
            height: 509
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 450
    },
    hut_with_garden_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_with_garden_2_png__WEBPACK_IMPORTED_MODULE_63___default.a,
          trim: {
            left: 172,
            top: 197,
            width: 328,
            height: 272
          }
        },
        surface: {
          url: _build_hut_with_garden_2_surface_png__WEBPACK_IMPORTED_MODULE_64___default.a,
          trim: {
            left: 124,
            top: 345,
            width: 335,
            height: 210
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 440
    },
    hut_with_garden_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_with_garden_1_png__WEBPACK_IMPORTED_MODULE_65___default.a,
          trim: {
            left: 0,
            top: 156,
            width: 455,
            height: 313
          }
        },
        surface: {
          url: _build_hut_with_garden_1_surface_png__WEBPACK_IMPORTED_MODULE_66___default.a,
          trim: {
            left: 4,
            top: 390,
            width: 472,
            height: 186
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 465
    },
    fire_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_fire_1_png__WEBPACK_IMPORTED_MODULE_67___default.a,
          trim: {
            left: 166,
            top: 246,
            width: 162,
            height: 264
          }
        },
        surface: {
          url: _build_fire_1_surface_png__WEBPACK_IMPORTED_MODULE_68___default.a,
          trim: {
            left: 40,
            top: 239,
            width: 415,
            height: 313
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 490
    },
    hut_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_2_png__WEBPACK_IMPORTED_MODULE_69___default.a,
          trim: {
            left: 63,
            top: 287,
            width: 366,
            height: 176
          }
        },
        surface: {
          url: _build_hut_2_surface_png__WEBPACK_IMPORTED_MODULE_70___default.a,
          trim: {
            left: 45,
            top: 308,
            width: 180,
            height: 211
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 460
    },
    hut_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_hut_1_png__WEBPACK_IMPORTED_MODULE_71___default.a,
          trim: {
            left: 111,
            top: 239,
            width: 396,
            height: 275
          }
        },
        surface: {
          url: _build_hut_1_surface_png__WEBPACK_IMPORTED_MODULE_72___default.a,
          trim: {
            left: 3,
            top: 340,
            width: 377,
            height: 215
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 460
    },
    pine_2: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_pine_2_png__WEBPACK_IMPORTED_MODULE_73___default.a,
          trim: {
            left: 35,
            top: 19,
            width: 423,
            height: 569
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 514
    },
    fruit_tree: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [2, 2],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_fruit_tree_png__WEBPACK_IMPORTED_MODULE_74___default.a,
          trim: {
            left: 124,
            top: 110,
            width: 328,
            height: 362
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 440
    },
    waterwell: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [1, 1],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_waterwell_png__WEBPACK_IMPORTED_MODULE_75___default.a,
          trim: {
            left: 34,
            top: 0,
            width: 431,
            height: 524
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 470
    },
    castle: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [5, 5],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_castle_png__WEBPACK_IMPORTED_MODULE_76___default.a,
          trim: {
            left: 27,
            top: 0,
            width: 483,
            height: 487
          }
        },
        surface: {
          url: _build_castle_surface_png__WEBPACK_IMPORTED_MODULE_77___default.a,
          trim: {
            left: 21,
            top: 283,
            width: 491,
            height: 330
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 465
    },
    pine_1: {
      modulo: false,
      skewX: false,
      skewY: false,
      size: [3, 3],
      surface: '!water|lake|build',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      images: {
        main: {
          url: _build_pine_1_png__WEBPACK_IMPORTED_MODULE_78___default.a,
          trim: {
            left: 47,
            top: 0,
            width: 405,
            height: 478
          }
        },
        surface: {
          url: _build_pine_1_surface_png__WEBPACK_IMPORTED_MODULE_79___default.a,
          trim: {
            left: 0,
            top: 271,
            width: 512,
            height: 342
          }
        }
      },
      type: 'build',
      orig: {
        left: 0,
        top: 0,
        width: 512,
        height: 613
      },
      cutoff: 475
    }
  }
};


if (true) {
  module.hot.dispose(function () {
    window.location.reload();
  });
  module.hot.accept();
}

/***/ }),

/***/ "./src/assets/img/textures/build_berries_blue.png":
/*!********************************************************!*\
  !*** ./src/assets/img/textures/build_berries_blue.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_berries_blue.png";

/***/ }),

/***/ "./src/assets/img/textures/build_berries_red.png":
/*!*******************************************************!*\
  !*** ./src/assets/img/textures/build_berries_red.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_berries_red.png";

/***/ }),

/***/ "./src/assets/img/textures/build_castle.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_castle.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_castle.png";

/***/ }),

/***/ "./src/assets/img/textures/build_castle_surface.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_castle_surface.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_castle_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_catapult_1.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_catapult_1.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_catapult_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_catapult_1_surface.png":
/*!**************************************************************!*\
  !*** ./src/assets/img/textures/build_catapult_1_surface.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_catapult_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_catapult_2.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_catapult_2.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_catapult_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_catapult_2_surface.png":
/*!**************************************************************!*\
  !*** ./src/assets/img/textures/build_catapult_2_surface.png ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_catapult_2_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_dark_hut_1.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_dark_hut_1.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_dark_hut_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_dark_hut_2.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_dark_hut_2.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_dark_hut_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_dark_hut_3.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_dark_hut_3.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_dark_hut_3.png";

/***/ }),

/***/ "./src/assets/img/textures/build_defense_tree_1.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_defense_tree_1.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_defense_tree_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_defense_tree_2.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_defense_tree_2.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_defense_tree_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_defense_tree_dark_1.png":
/*!***************************************************************!*\
  !*** ./src/assets/img/textures/build_defense_tree_dark_1.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_defense_tree_dark_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_defense_tree_dark_2.png":
/*!***************************************************************!*\
  !*** ./src/assets/img/textures/build_defense_tree_dark_2.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_defense_tree_dark_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_defense_tree_dark_3.png":
/*!***************************************************************!*\
  !*** ./src/assets/img/textures/build_defense_tree_dark_3.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_defense_tree_dark_3.png";

/***/ }),

/***/ "./src/assets/img/textures/build_farm.png":
/*!************************************************!*\
  !*** ./src/assets/img/textures/build_farm.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_farm.png";

/***/ }),

/***/ "./src/assets/img/textures/build_farm_surface.png":
/*!********************************************************!*\
  !*** ./src/assets/img/textures/build_farm_surface.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_farm_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_fire_1.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_fire_1.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_fire_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_fire_1_surface.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_fire_1_surface.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_fire_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_flowers_1.png":
/*!*****************************************************!*\
  !*** ./src/assets/img/textures/build_flowers_1.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_flowers_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_flowers_1_surface.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_flowers_1_surface.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_flowers_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_fruit_tree.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_fruit_tree.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_fruit_tree.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_1.png":
/*!*************************************************!*\
  !*** ./src/assets/img/textures/build_hut_1.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_1_surface.png":
/*!*********************************************************!*\
  !*** ./src/assets/img/textures/build_hut_1_surface.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_2.png":
/*!*************************************************!*\
  !*** ./src/assets/img/textures/build_hut_2.png ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_2_surface.png":
/*!*********************************************************!*\
  !*** ./src/assets/img/textures/build_hut_2_surface.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_2_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_1.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_1.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_1_surface.png":
/*!*********************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_1_surface.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_2.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_2.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_2_surface.png":
/*!*********************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_2_surface.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_2_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_3.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_3.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_3.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_3_surface.png":
/*!*********************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_3_surface.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_3_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_4.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_4.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_4.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_5.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_5.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_5.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_5_surface.png":
/*!*********************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_5_surface.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_5_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_6.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_6.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_6.png";

/***/ }),

/***/ "./src/assets/img/textures/build_hut_with_garden_6_surface.png":
/*!*********************************************************************!*\
  !*** ./src/assets/img/textures/build_hut_with_garden_6_surface.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_hut_with_garden_6_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_lake_1.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_lake_1.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_lake_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_lake_1_surface.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_lake_1_surface.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_lake_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_lake_2.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_lake_2.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_lake_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_palmtree_1.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_palmtree_1.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_palmtree_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_palmtree_2.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_palmtree_2.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_palmtree_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_palmtree_3.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_palmtree_3.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_palmtree_3.png";

/***/ }),

/***/ "./src/assets/img/textures/build_palmtree_4.png":
/*!******************************************************!*\
  !*** ./src/assets/img/textures/build_palmtree_4.png ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_palmtree_4.png";

/***/ }),

/***/ "./src/assets/img/textures/build_palmtree_with_hut.png":
/*!*************************************************************!*\
  !*** ./src/assets/img/textures/build_palmtree_with_hut.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_palmtree_with_hut.png";

/***/ }),

/***/ "./src/assets/img/textures/build_palmtree_with_hut_surface.png":
/*!*********************************************************************!*\
  !*** ./src/assets/img/textures/build_palmtree_with_hut_surface.png ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_palmtree_with_hut_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_pine_1.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_pine_1.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_pine_1.png";

/***/ }),

/***/ "./src/assets/img/textures/build_pine_1_surface.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_pine_1_surface.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_pine_1_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_pine_2.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_pine_2.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_pine_2.png";

/***/ }),

/***/ "./src/assets/img/textures/build_quarry.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_quarry.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_quarry.png";

/***/ }),

/***/ "./src/assets/img/textures/build_red_tent.png":
/*!****************************************************!*\
  !*** ./src/assets/img/textures/build_red_tent.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_red_tent.png";

/***/ }),

/***/ "./src/assets/img/textures/build_school.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_school.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_school.png";

/***/ }),

/***/ "./src/assets/img/textures/build_school_surface.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/build_school_surface.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_school_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_small_forest.png":
/*!********************************************************!*\
  !*** ./src/assets/img/textures/build_small_forest.png ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_small_forest.png";

/***/ }),

/***/ "./src/assets/img/textures/build_temple.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/build_temple.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_temple.png";

/***/ }),

/***/ "./src/assets/img/textures/build_tiny_island.png":
/*!*******************************************************!*\
  !*** ./src/assets/img/textures/build_tiny_island.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_tiny_island.png";

/***/ }),

/***/ "./src/assets/img/textures/build_tiny_island_surface.png":
/*!***************************************************************!*\
  !*** ./src/assets/img/textures/build_tiny_island_surface.png ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_tiny_island_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_vinyard.png":
/*!***************************************************!*\
  !*** ./src/assets/img/textures/build_vinyard.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_vinyard.png";

/***/ }),

/***/ "./src/assets/img/textures/build_vinyard_surface.png":
/*!***********************************************************!*\
  !*** ./src/assets/img/textures/build_vinyard_surface.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_vinyard_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_volcano.png":
/*!***************************************************!*\
  !*** ./src/assets/img/textures/build_volcano.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_volcano.png";

/***/ }),

/***/ "./src/assets/img/textures/build_volcano_surface.png":
/*!***********************************************************!*\
  !*** ./src/assets/img/textures/build_volcano_surface.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_volcano_surface.png";

/***/ }),

/***/ "./src/assets/img/textures/build_waterwell.png":
/*!*****************************************************!*\
  !*** ./src/assets/img/textures/build_waterwell.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/build_waterwell.png";

/***/ }),

/***/ "./src/assets/img/textures/fence_high_wood.png":
/*!*****************************************************!*\
  !*** ./src/assets/img/textures/fence_high_wood.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/fence_high_wood.png";

/***/ }),

/***/ "./src/assets/img/textures/fence_low_wood.png":
/*!****************************************************!*\
  !*** ./src/assets/img/textures/fence_low_wood.png ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/fence_low_wood.png";

/***/ }),

/***/ "./src/assets/img/textures/kiwi_default.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/kiwi_default.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/kiwi_default.png";

/***/ }),

/***/ "./src/assets/img/textures/kiwi_default_shadow.png":
/*!*********************************************************!*\
  !*** ./src/assets/img/textures/kiwi_default_shadow.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/kiwi_default_shadow.png";

/***/ }),

/***/ "./src/assets/img/textures/road_pier.png":
/*!***********************************************!*\
  !*** ./src/assets/img/textures/road_pier.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_pier.png";

/***/ }),

/***/ "./src/assets/img/textures/road_pier_build.png":
/*!*****************************************************!*\
  !*** ./src/assets/img/textures/road_pier_build.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_pier_build.png";

/***/ }),

/***/ "./src/assets/img/textures/road_pier_start_bottom.png":
/*!************************************************************!*\
  !*** ./src/assets/img/textures/road_pier_start_bottom.png ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_pier_start_bottom.png";

/***/ }),

/***/ "./src/assets/img/textures/road_pier_start_left.png":
/*!**********************************************************!*\
  !*** ./src/assets/img/textures/road_pier_start_left.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_pier_start_left.png";

/***/ }),

/***/ "./src/assets/img/textures/road_pier_start_right.png":
/*!***********************************************************!*\
  !*** ./src/assets/img/textures/road_pier_start_right.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_pier_start_right.png";

/***/ }),

/***/ "./src/assets/img/textures/road_pier_start_top.png":
/*!*********************************************************!*\
  !*** ./src/assets/img/textures/road_pier_start_top.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_pier_start_top.png";

/***/ }),

/***/ "./src/assets/img/textures/road_sand.png":
/*!***********************************************!*\
  !*** ./src/assets/img/textures/road_sand.png ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_sand.png";

/***/ }),

/***/ "./src/assets/img/textures/road_stone.png":
/*!************************************************!*\
  !*** ./src/assets/img/textures/road_stone.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/road_stone.png";

/***/ }),

/***/ "./src/assets/img/textures/surface_dirt.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/surface_dirt.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/surface_dirt.png";

/***/ }),

/***/ "./src/assets/img/textures/surface_grass.png":
/*!***************************************************!*\
  !*** ./src/assets/img/textures/surface_grass.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/surface_grass.png";

/***/ }),

/***/ "./src/assets/img/textures/surface_sand.png":
/*!**************************************************!*\
  !*** ./src/assets/img/textures/surface_sand.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/surface_sand.png";

/***/ }),

/***/ "./src/assets/img/textures/surface_stone.png":
/*!***************************************************!*\
  !*** ./src/assets/img/textures/surface_stone.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/surface_stone.png";

/***/ }),

/***/ "./src/assets/img/textures/surface_water.png":
/*!***************************************************!*\
  !*** ./src/assets/img/textures/surface_water.png ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/surface_water.png";

/***/ }),

/***/ "./src/assets/map.json":
/*!*****************************!*\
  !*** ./src/assets/map.json ***!
  \*****************************/
/*! exports provided: build/castle, surface/dirt, road/stone, surface/grass, build/fire_1, surface/water, build/hut_1, build/defense_tree_1, build/pine_2, build/pine_1, build/waterwell, build/vinyard, fence/low_wood, build/fruit_tree, build/hut_with_garden_6, build/berries_red, build/berries_blue, build/hut_with_garden_1, build/defense_tree_2, build/hut_with_garden_5, build/red_tent, build/farm, build/tiny_island, build/school, surface/sand, build/catapult_1, road/pier, build/small_forest, kiwi/default, build/catapult_2, build/lake_2, build/palmtree_with_hut, build/palmtree_1, build/defense_tree_dark_3, surface/stone, build/dark_hut_2, build/palmtree_4, build/palmtree_2, build/palmtree_3, build/defense_tree_dark_1, build/defense_tree_dark_2, build/temple, build/dark_hut_1, build/dark_hut_3, build/hut_with_garden_2, build/hut_2, build/hut_with_garden_3, build/flowers_1, fence/high_wood, build/volcano, build/lake_1, build/quarry, build/hut_with_garden_4, default */
/***/ (function(module) {

module.exports = {"build/castle":[[0,-5,6,6]],"surface/dirt":[[-1,-1,3,3],[-1,2,3,3],[-1,5,3,3],[-1,8,3,3],[-1,11,3,3],[-1,14,3,3],[-1,17,3,3],[-1,-16,3,3],[-1,-19,3,3],[2,-1,3,3],[2,2,3,3],[2,5,3,3],[2,8,3,3],[2,11,3,3],[2,14,3,3],[2,17,3,3],[2,-4,3,3],[2,-16,3,3],[2,-19,3,3],[5,-1,3,3],[5,2,3,3],[5,5,3,3],[5,8,3,3],[5,11,3,3],[5,14,3,3],[5,17,3,3],[5,-16,3,3],[5,-19,3,3],[5,-22,3,3],[5,-25,3,3],[5,-28,3,3],[8,-1,3,3],[8,2,3,3],[8,5,3,3],[8,8,3,3],[8,11,3,3],[8,14,3,3],[8,17,3,3],[8,-10,3,3],[8,-16,3,3],[8,-28,3,3],[8,-25,3,3],[8,-22,3,3],[11,2,3,3],[11,5,3,3],[11,8,3,3],[11,14,3,3],[11,17,3,3],[11,-4,3,3],[11,-13,3,3],[11,-10,3,3],[11,-28,3,3],[11,-25,3,3],[11,-22,3,3],[14,-1,3,3],[14,2,3,3],[14,5,3,3],[14,14,3,3],[14,17,3,3],[14,-10,3,3],[14,-13,3,3],[14,-28,3,3],[14,-25,3,3],[14,-22,3,3],[17,2,3,3],[17,11,3,3],[17,14,3,3],[17,17,3,3],[17,-10,3,3],[17,-25,3,3],[17,-28,3,3],[17,-22,3,3],[20,2,3,3],[20,8,3,3],[20,11,3,3],[23,-1,3,3],[23,2,3,3],[23,8,3,3],[23,11,3,3],[23,14,3,3],[23,17,3,3],[26,14,3,3],[26,-7,3,3],[29,-7,3,3],[32,5,3,3],[32,11,3,3],[32,-13,3,3],[32,-10,3,3],[32,-7,3,3],[32,-16,3,3],[35,-1,3,3],[35,2,3,3],[35,5,3,3],[35,8,3,3],[35,11,3,3],[35,14,3,3],[35,17,3,3],[35,-4,3,3],[38,-22,3,3],[41,-25,3,3],[41,-28,3,3],[44,-28,3,3],[-7,2,3,3],[-7,5,3,3],[-7,8,3,3],[-7,11,3,3],[-7,14,3,3],[-7,17,3,3],[-7,-16,3,3],[-4,-1,3,3],[-4,2,3,3],[-4,5,3,3],[-4,11,3,3],[-4,14,3,3],[-4,17,3,3],[-4,-16,3,3],[-4,-19,3,3],[-10,-1,3,3],[-10,2,3,3],[-10,5,3,3],[-10,8,3,3],[-10,11,3,3],[-10,14,3,3],[-10,17,3,3],[-10,-4,3,3],[-10,-7,3,3],[-10,-13,3,3],[-10,-10,3,3],[-10,-16,3,3],[-10,-19,3,3],[-10,-22,3,3],[-10,-25,3,3],[-10,-28,3,3],[-13,-1,3,3],[-13,5,3,3],[-13,8,3,3],[-13,11,3,3],[-13,14,3,3],[-13,-19,3,3],[-13,-10,3,3],[-13,-7,3,3],[-13,-4,3,3],[-13,-16,3,3],[-13,-22,3,3],[-13,-25,3,3],[-13,-28,3,3],[-16,8,3,3],[-16,11,3,3],[-16,14,3,3],[-16,-19,3,3],[-16,-16,3,3],[-16,-4,3,3],[-16,-7,3,3],[-16,-22,3,3],[-16,-25,3,3],[-16,-28,3,3],[-19,-1,3,3],[-19,5,3,3],[-19,8,3,3],[-19,-19,3,3],[-19,-22,3,3],[-19,-25,3,3],[-19,-28,3,3],[-19,-4,3,3],[-22,8,3,3],[-22,11,3,3],[-25,8,3,3],[-25,-7,3,3],[-28,8,3,3],[-28,-7,3,3],[-31,2,3,3],[-31,5,3,3],[-31,8,3,3],[-31,-7,3,3]],"road/stone":[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,-2],[0,-1],[1,6],[1,-2],[2,6],[2,7],[2,-2],[3,7],[3,8],[3,9],[3,10],[3,11],[3,12]],"surface/grass":[[-1,-7,3,3],[-1,-4,3,3],[-1,-13,3,3],[-1,-28,3,3],[-1,-25,3,3],[-1,-22,3,3],[2,-7,3,3],[2,-13,3,3],[2,-10,3,3],[2,-22,3,3],[2,-25,3,3],[2,-28,3,3],[5,-7,3,3],[5,-4,3,3],[5,-13,3,3],[5,-10,3,3],[8,-13,3,3],[8,-4,3,3],[8,-7,3,3],[11,-7,3,3],[11,-19,3,3],[14,-19,3,3],[17,-1,3,3],[17,-13,3,3],[20,14,3,3],[20,17,3,3],[20,-13,3,3],[20,-16,3,3],[20,-19,3,3],[23,-19,3,3],[23,-16,3,3],[26,-10,3,3],[29,11,3,3],[29,14,3,3],[29,-10,3,3],[32,-1,3,3],[32,2,3,3],[32,14,3,3],[32,17,3,3],[32,-4,3,3],[35,-28,3,3],[35,-25,3,3],[35,-22,3,3],[35,-19,3,3],[38,-25,3,3],[38,-28,3,3],[-7,-1,3,3],[-7,-13,3,3],[-7,-10,3,3],[-7,-4,3,3],[-7,-7,3,3],[-7,-28,3,3],[-7,-25,3,3],[-7,-22,3,3],[-4,8,3,3],[-4,-13,3,3],[-4,-4,3,3],[-4,-7,3,3],[-4,-10,3,3],[-4,-28,3,3],[-4,-25,3,3],[-4,-22,3,3],[-13,17,3,3],[-13,-13,3,3],[-16,5,3,3],[-16,17,3,3],[-19,11,3,3],[-19,14,3,3],[-19,17,3,3]],"build/fire_1":[[0,-12],[-6,-10]],"surface/water":[[-1,-10,3,3],[8,-19,3,3],[11,-1,3,3],[11,11,3,3],[11,-16,3,3],[14,8,3,3],[14,11,3,3],[14,-16,3,3],[14,-7,3,3],[14,-4,3,3],[17,5,3,3],[17,8,3,3],[17,-16,3,3],[17,-19,3,3],[17,-7,3,3],[17,-4,3,3],[20,-1,3,3],[20,5,3,3],[20,-25,3,3],[20,-28,3,3],[20,-4,3,3],[20,-7,3,3],[20,-10,3,3],[23,5,3,3],[23,-22,3,3],[23,-25,3,3],[23,-28,3,3],[23,-13,3,3],[23,-10,3,3],[23,-4,3,3],[26,-1,3,3],[26,2,3,3],[26,5,3,3],[26,8,3,3],[26,11,3,3],[26,17,3,3],[26,-28,3,3],[26,-22,3,3],[26,-25,3,3],[26,-4,3,3],[26,-13,3,3],[26,-16,3,3],[26,-19,3,3],[29,2,3,3],[29,5,3,3],[29,17,3,3],[29,-28,3,3],[29,-22,3,3],[29,-25,3,3],[29,-19,3,3],[29,-16,3,3],[29,-13,3,3],[32,-19,3,3],[32,-22,3,3],[32,-25,3,3],[32,-28,3,3],[-7,-19,3,3],[-13,2,3,3],[-16,2,3,3],[-16,-10,3,3],[-19,2,3,3],[-19,-13,3,3],[-19,-10,3,3],[-19,-7,3,3],[-22,-1,3,3],[-22,2,3,3],[-22,-7,3,3],[-22,-4,3,3],[-22,-13,3,3],[-22,-10,3,3],[-25,-1,3,3],[-25,2,3,3],[-28,-1,3,3],[-28,2,3,3],[-31,-1,3,3],[-31,-4,3,3]],"build/hut_1":[[1,-13,1,2]],"build/defense_tree_1":[[1,-22,2,2]],"build/pine_2":[[2,4],[2,5],[2,-10],[2,-8],[3,-10],[3,-9],[4,-7],[4,-10],[4,-9],[4,-8],[5,-11],[5,-10],[8,-10],[9,-10],[9,-9],[10,6],[-7,-12],[-7,-11],[-6,-12],[-6,-11],[-10,-10],[-9,-12],[-9,-11],[-9,-10],[-8,-11],[-8,-8]],"build/pine_1":[[2,-13,3,3],[10,1,3,3],[-9,-4,3,3]],"build/waterwell":[[2,-9],[16,0]],"build/vinyard":[[3,3,6,6]],"fence/low_wood":[[5,-25],[5,-24],[5,-23],[5,-27],[5,-26],[6,-27],[8,-21],[8,-3],[8,-2],[9,-21],[9,-3],[10,-21],[10,-3],[11,-21],[12,-21]],"build/fruit_tree":[[6,1,2,2],[-13,-15,2,2]],"build/hut_with_garden_6":[[6,-26,3,3]],"build/berries_red":[[12,-5,2,1],[13,2,2,1],[-3,2,2,1],[-3,-3,2,1]],"build/berries_blue":[[13,-6],[16,-8],[18,0],[-2,-2]],"build/hut_with_garden_1":[[14,-19,3,3]],"build/defense_tree_2":[[15,-25,2,2]],"build/hut_with_garden_5":[[16,1,3,3]],"build/red_tent":[[16,-13],[24,0]],"build/farm":[[18,15,4,4]],"build/tiny_island":[[19,-5,2,2]],"build/school":[[20,-15,3,3]],"surface/sand":[[20,-22,3,3],[23,-7,3,3],[29,-1,3,3],[29,8,3,3],[29,-4,3,3],[32,8,3,3],[-16,-1,3,3],[-16,-13,3,3],[-19,-16,3,3],[-22,-16,3,3]],"build/catapult_1":[[24,-6,2,1]],"road/pier":[[25,-24],[26,-24],[27,-22],[27,-21],[27,-20],[27,-24],[27,-23],[27,-19],[28,-24],[28,-19],[29,-24],[29,-19],[30,-24],[30,-19],[31,-24],[31,-19],[32,-19],[32,-22],[32,-21],[32,-20],[32,-24],[32,-23],[-19,1],[-18,-8],[-17,1],[-17,2],[-17,3],[-17,4],[-17,5],[-17,-8],[-22,1],[-21,1],[-20,1],[-25,0],[-25,1],[-25,2],[-25,3],[-25,4],[-25,5],[-25,-1],[-25,-2],[-24,1],[-23,1]],"build/small_forest":[[27,-10,3,3]],"kiwi/default":[[27,-24],[27,-19],[32,-19],[32,-24],[-13,6],[-13,7],[-13,8],[-13,9],[-13,10],[-12,6],[-12,7],[-12,8],[-12,9],[-12,10],[-16,6],[-16,7],[-16,8],[-16,9],[-16,10],[-15,6],[-15,7],[-15,8],[-15,9],[-15,10],[-14,6],[-14,7],[-14,8],[-14,9],[-14,10],[-18,-8],[-17,-8],[-22,6],[-25,1],[-27,5],[-27,10],[-27,-5],[-27,-19],[-26,-20]],"build/catapult_2":[[30,9,3,1],[-7,3,3,1]],"build/lake_2":[[31,14,4,2]],"build/palmtree_with_hut":[[31,-2,2,2]],"build/palmtree_1":[[33,13],[34,1],[-25,-7],[-27,-6]],"build/defense_tree_dark_3":[[35,-18,2,2],[38,18,2,2]],"surface/stone":[[35,-16,3,3],[35,-13,3,3],[35,-10,3,3],[35,-7,3,3],[38,-1,3,3],[38,2,3,3],[38,5,3,3],[38,8,3,3],[38,11,3,3],[38,14,3,3],[38,17,3,3],[38,-19,3,3],[38,-16,3,3],[38,-13,3,3],[38,-10,3,3],[38,-7,3,3],[38,-4,3,3],[41,-1,3,3],[41,2,3,3],[41,5,3,3],[41,8,3,3],[41,11,3,3],[41,14,3,3],[41,17,3,3],[41,-22,3,3],[41,-19,3,3],[41,-16,3,3],[41,-13,3,3],[41,-10,3,3],[41,-7,3,3],[41,-4,3,3],[44,-1,3,3],[44,2,3,3],[44,5,3,3],[44,8,3,3],[44,11,3,3],[44,14,3,3],[44,17,3,3],[44,-22,3,3],[44,-25,3,3],[44,-4,3,3],[44,-7,3,3],[44,-10,3,3],[44,-13,3,3],[44,-16,3,3],[44,-19,3,3],[47,-1,3,3],[47,2,3,3],[47,5,3,3],[47,8,3,3],[47,11,3,3],[47,14,3,3],[47,17,3,3],[47,-22,3,3],[47,-25,3,3],[47,-28,3,3],[47,-16,3,3],[47,-13,3,3],[47,-10,3,3],[47,-7,3,3],[47,-4,3,3],[47,-19,3,3],[-22,5,3,3],[-22,14,3,3],[-22,17,3,3],[-22,-19,3,3],[-22,-22,3,3],[-22,-25,3,3],[-22,-28,3,3],[-25,5,3,3],[-25,11,3,3],[-25,14,3,3],[-25,17,3,3],[-25,-4,3,3],[-25,-28,3,3],[-25,-25,3,3],[-25,-22,3,3],[-25,-19,3,3],[-25,-16,3,3],[-25,-13,3,3],[-25,-10,3,3],[-28,5,3,3],[-28,11,3,3],[-28,14,3,3],[-28,17,3,3],[-28,-4,3,3],[-28,-10,3,3],[-28,-13,3,3],[-28,-16,3,3],[-28,-19,3,3],[-28,-22,3,3],[-28,-25,3,3],[-28,-28,3,3],[-31,11,3,3],[-31,14,3,3],[-31,17,3,3],[-31,-19,3,3],[-31,-22,3,3],[-31,-25,3,3],[-31,-28,3,3],[-31,-16,3,3],[-31,-13,3,3],[-31,-10,3,3]],"build/dark_hut_2":[[35,-7,3,3]],"build/palmtree_4":[[36,4],[-25,-6],[-28,-6],[-27,-5]],"build/palmtree_2":[[37,5],[-26,-6]],"build/palmtree_3":[[38,4],[-26,-7],[-26,-5]],"build/defense_tree_dark_1":[[38,7,2,2]],"build/defense_tree_dark_2":[[41,-26,2,2]],"build/temple":[[42,-16,5,5]],"build/dark_hut_1":[[43,-1,3,3]],"build/dark_hut_3":[[46,12,3,3]],"build/hut_with_garden_2":[[-3,-19,3,3]],"build/hut_2":[[-8,-10,2,1]],"build/hut_with_garden_3":[[-5,10,3,3]],"build/flowers_1":[[-3,-2],[-15,-15],[-14,-14]],"fence/high_wood":[[-10,2],[-10,3],[-10,4],[-10,5],[-13,5],[-13,-4],[-12,5],[-12,-4],[-11,0],[-11,1],[-11,2],[-11,5],[-11,-1],[-11,-4],[-11,-3],[-11,-2],[-16,5],[-16,-4],[-15,5],[-15,-4],[-14,5],[-14,-4],[-19,5],[-19,-4],[-18,5],[-18,-4],[-17,-4],[-22,11],[-22,-13],[-21,4],[-21,5],[-21,6],[-21,7],[-21,8],[-21,9],[-21,10],[-21,11],[-21,-7],[-21,-6],[-21,-5],[-21,-4],[-21,-13],[-21,-12],[-21,-11],[-21,-10],[-21,-9],[-21,-8],[-20,5],[-20,-4],[-25,11],[-25,-21],[-25,-20],[-25,-19],[-25,-18],[-25,-13],[-24,11],[-24,-13],[-23,11],[-23,-13],[-28,0],[-28,1],[-28,2],[-28,3],[-28,4],[-28,5],[-28,6],[-28,7],[-28,8],[-28,9],[-28,10],[-28,11],[-28,-1],[-28,-13],[-28,-19],[-28,-18],[-28,-21],[-28,-20],[-27,11],[-27,-13],[-27,-18],[-27,-21],[-26,11],[-26,-13],[-26,-18],[-26,-21],[-31,-7],[-31,-6],[-31,-5],[-31,-1],[-31,-4],[-31,-3],[-31,-2],[-31,-13],[-31,-12],[-31,-11],[-31,-10],[-31,-9],[-31,-8],[-30,-1],[-30,-13],[-29,-1],[-29,-13]],"build/volcano":[[-14,-27,5,5]],"build/lake_1":[[-15,13,5,5]],"build/quarry":[[-15,-4,4,4]],"build/hut_with_garden_4":[[-13,-18,3,3]]};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! App */ "./src/lib/App.js");

window.app = new App__WEBPACK_IMPORTED_MODULE_0__["App"]({
  resizeTo: window,
  transparent: true
});

/***/ }),

/***/ "./src/lib/App.js":
/*!************************!*\
  !*** ./src/lib/App.js ***!
  \************************/
/*! exports provided: App */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "App", function() { return App; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var static_ResizeHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! static/ResizeHandler */ "./src/lib/static/ResizeHandler.js");
/* harmony import */ var grid_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Grid */ "./src/lib/grid/Grid.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./App.scss */ "./src/lib/App.scss");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _assets_fonts_fonts_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../assets/fonts/fonts.scss */ "./src/assets/fonts/fonts.scss");
/* harmony import */ var _assets_fonts_fonts_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_fonts_fonts_scss__WEBPACK_IMPORTED_MODULE_6__);
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var App =
/*#__PURE__*/
function (_PIXI$Application) {
  _inherits(App, _PIXI$Application);

  function App(settings) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, settings)); // REGISTER SELF

    App.App = _assertThisInitialized(_this); // ADD TO HTML

    document.body.appendChild(_this.view); // INTERFACE

    _this.interface = new interface_Interface__WEBPACK_IMPORTED_MODULE_4__["Interface"](); // MAIN GRID

    _this.grid = _this.stage.addChild(new grid_Grid__WEBPACK_IMPORTED_MODULE_3__["Grid"]()); // SETUP RESIZE-HANDLER

    static_ResizeHandler__WEBPACK_IMPORTED_MODULE_2__["ResizeHandler"].source = _this.screen;
    static_ResizeHandler__WEBPACK_IMPORTED_MODULE_2__["ResizeHandler"].add(function (dimensions) {
      _this.grid.screen = _this.screen;
    }); // TRIGGER INITIAL RESIZE

    static_ResizeHandler__WEBPACK_IMPORTED_MODULE_2__["ResizeHandler"].trigger();
    return _this;
  }

  _createClass(App, null, [{
    key: "register",
    value: function register(instance) {
      var name = instance.constructor.name;

      if (App[name]) {
        throw new Error('App.' + name + ' is already registered.');
        return;
      }

      App[name] = instance;
      console.log('App.register', name, instance);
    }
  }]);

  return App;
}(pixi_js__WEBPACK_IMPORTED_MODULE_1__["Application"]);
;
window.App = App;

/***/ }),

/***/ "./src/lib/App.scss":
/*!**************************!*\
  !*** ./src/lib/App.scss ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../node_modules/sass-loader/lib/loader.js??ref--5-2!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/App.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../node_modules/sass-loader/lib/loader.js??ref--5-2!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/App.scss", function() {
		var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../node_modules/sass-loader/lib/loader.js??ref--5-2!./App.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/App.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/lib/grid/Data.js":
/*!******************************!*\
  !*** ./src/lib/grid/Data.js ***!
  \******************************/
/*! exports provided: Data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Data", function() { return Data; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var grid_Stamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Stamp */ "./src/lib/grid/Stamp.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_types_Type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/types/Type */ "./src/lib/grid/types/Type.js");
/* harmony import */ var _assets_map_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/map.json */ "./src/assets/map.json");
var _assets_map_json__WEBPACK_IMPORTED_MODULE_5___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../../assets/map.json */ "./src/assets/map.json", 1);
/* harmony import */ var save_file__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! save-file */ "./node_modules/save-file/browser.js");
/* harmony import */ var save_file__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(save_file__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }








var Data =
/*#__PURE__*/
function () {
  function Data() {
    _classCallCheck(this, Data);

    this.unpack();
  }

  _createClass(Data, [{
    key: "test",
    value: function test(id, toTiles) {
      var appendContent = this.add(id, toTiles, true);
      console.log('Data.test', id, appendContent);
      return appendContent;
    }
  }, {
    key: "remove",
    value: function remove(wildcard, fromTiles) {
      console.log('Data.remove', wildcard, fromTiles);

      for (var i = fromTiles.length - 1; i >= 0; i--) {
        fromTiles[i].content.remove(wildcard);
        grid_types_Type__WEBPACK_IMPORTED_MODULE_4__["Road"].recursiveConnect(fromTiles[i]);
        grid_types_Type__WEBPACK_IMPORTED_MODULE_4__["Fence"].recursiveConnect(fromTiles[i]);
      }
    }
  }, {
    key: "destroy",
    value: function destroy(tiles) {
      var _this = this;

      var allNodes = [],
          nodes;
      tiles.forEach(function (tile) {
        nodes = tile.content.getDataNodes('');
        nodes.forEach(function (node) {
          if (allNodes.indexOf(node) === -1) allNodes.push(node);
        });
      }); // DESTROY NODES

      allNodes.forEach(function (node) {
        _this.remove(node.id, node.tiles);
      }); // REMOVE TILES

      tiles.forEach(function (tile) {
        App__WEBPACK_IMPORTED_MODULE_3__["App"].Grid.remove(tile.cx, tile.cy);
      });
    }
  }, {
    key: "add",
    value: function add(id, toTiles) {
      var testOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var textureData = interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][id],
          type = textureData.type; // CHECK IF IT CAN BE ADDED

      var appendContent = true;

      for (var i = toTiles.length - 1, tile; i >= 0; i--) {
        tile = toTiles[i];

        if (type === 'road' && tile.content.contains('road')) {
          // CLEAR SINGLE TILES
          if (!testOnly) tile.content.remove('road');
        } else if (type === 'fence' && tile.content.contains('fence')) {
          // CLEAR SINGLE TILES
          if (!testOnly) tile.content.remove('fence');
        } else if (type === 'surface' && tile.content.contains('surface')) {
          // NEW SURFACE
          if (!testOnly) tile.content.remove(type);
        } else if (tile.content.contains(id)) {
          // DONT ADD DUPLICATES / DONT OVERLAP BUILDINGS;
          appendContent = false;
          break;
        }
      }

      if (testOnly) {
        return appendContent;
      } else if (appendContent) {
        // CREATE A STAMP
        var stamp = new grid_Stamp__WEBPACK_IMPORTED_MODULE_2__["Stamp"](textureData, toTiles); // CREATE A DATA_NODE

        var node = {
          id: id,
          tiles: toTiles.slice(0),
          sprites: stamp.sprites // REGISTER

        };
        node.tiles.forEach(function (tile, index) {
          // FOR ROADS && FENCES EACH NODE IS STORED SEPERATELY
          if (type === 'road' || type === 'fence') node = {
            id: id,
            tiles: [tile],
            sprites: [stamp.sprites[index]]
          };
          tile.content.add(id, node);
        });
        if (id.indexOf('fence') !== -1) grid_types_Type__WEBPACK_IMPORTED_MODULE_4__["Fence"].recursiveConnect(node.tiles[0]);
        if (id.indexOf('road') !== -1) grid_types_Type__WEBPACK_IMPORTED_MODULE_4__["Road"].recursiveConnect(node.tiles[0]);
        if (id.indexOf('surface') !== -1) grid_types_Type__WEBPACK_IMPORTED_MODULE_4__["Surface"].neighboursConnect(node.tiles[0]);
      }
    }
  }, {
    key: "unpack",
    value: function unpack() {
      for (var id in _assets_map_json__WEBPACK_IMPORTED_MODULE_5__) {
        for (var c = _assets_map_json__WEBPACK_IMPORTED_MODULE_5__[id].length, i = 0; i < c; i++) {
          var block = _assets_map_json__WEBPACK_IMPORTED_MODULE_5__[id][i],
              tiles = [],
              x,
              y;

          for (x = block[0]; x < block[0] + (block[2] || 1); x++) {
            for (y = block[1]; y < block[1] + (block[3] || 1); y++) {
              tiles.push(App__WEBPACK_IMPORTED_MODULE_3__["App"].Grid.getTile({
                x: x,
                y: y
              }, true, true));
            }
          }

          this.add(id, tiles);
        }
      }
    }
  }, {
    key: "store",
    value: function store() {
      var list = [],
          tiles = App__WEBPACK_IMPORTED_MODULE_3__["App"].Grid.tiles;
      var x, y, nodes, i, c, node;

      for (x in tiles) {
        for (y in tiles[x]) {
          nodes = tiles[x][y].content.getDataNodes();

          for (c = nodes.length, i = 0; i < c; i++) {
            node = nodes[i];

            if (list.indexOf(node) === -1) {
              list.push(node);
            }
          }
        }
      }

      var data = {};

      for (c = list.length, i = 0; i < c; i++) {
        node = list[i];
        if (!data[node.id]) data[node.id] = []; // BLOCK FORMAT [left,top,width,height]

        var block = [1000000, 1000000, 1, 1];
        node.tiles.forEach(function (tile) {
          block[0] = Math.min(block[0], tile.cx);
          block[1] = Math.min(block[1], tile.cy);
          block[2] = Math.max(tile.cx - block[0] + 1, block[2]);
          block[3] = Math.max(tile.cy - block[1] + 1, block[3]);
        });

        if (block[2] === 1 && block[3] === 1) {
          block.splice(2, 2);
        }

        data[node.id].push(block);
      }

      Object(save_file__WEBPACK_IMPORTED_MODULE_6__["save"])(JSON.stringify(data), 'test.json');
    }
  }]);

  return Data;
}();

Object(HotModule__WEBPACK_IMPORTED_MODULE_7__["HotModule"])(module, Data);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/Face.js":
/*!******************************!*\
  !*** ./src/lib/grid/Face.js ***!
  \******************************/
/*! exports provided: Face */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Face", function() { return Face; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var grid_Stamp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Stamp */ "./src/lib/grid/Stamp.js");
/* harmony import */ var grid_Data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Data */ "./src/lib/grid/Data.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Face =
/*#__PURE__*/
function (_PIXI$Container) {
  _inherits(Face, _PIXI$Container);

  function Face() {
    var _this;

    _classCallCheck(this, Face);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Face).call(this));
    _this.renderTypes = ['surface', 'road'];

    _this.renderTypes.forEach(function (type, index) {
      _this[type] = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]());
      _this[type].sortableChildren = true;
      _this[type + 'Sprite'] = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"]());
      _this[type + 'Sprite'].visible = false;
    });

    _this.g = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Graphics"]());
    _this.g.zIndex = 1000000;
    _this.sortableChildren = true;
    return _this;
  }

  _createClass(Face, [{
    key: "add",
    value: function add(sprite, type) {
      var _this2 = this;

      var addedZIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

      if (!sprite.texture.valid) {
        sprite.texture.on('update', function () {
          _this2.add(sprite, type, addedZIndex);
        });
        return;
      } // SET APPROPRIATE Z-INDEX


      sprite.zIndex = 100000 + sprite.y + (1 - sprite.anchor.y) * sprite.texture.orig.height * sprite.scale.y + addedZIndex;

      if (sprite.cutoff) {
        sprite.zIndex -= (sprite.texture.orig.height - sprite.cutoff) * sprite.scale.y;
      } //if( sprite.type === 'kiwi' ) console.trace('Face.add', sprite.type, sprite.cutoff, addedZIndex);


      if (this[type]) {
        this[type].addChild(sprite);
        this[type].visible = true;
        this[type + 'Sprite'].visible = false;

        if (!sprite.texture.valid) {
          sprite.texture.on('update', function () {
            _this2.renderTexture(type);
          });
        } else {
          this.renderTexture(type);
        }
      } else {
        this.addChild(sprite);
      }

      var s, derivate;

      for (s in sprite.derivates) {
        derivate = sprite.derivates[s];
        this.add(derivate, derivate.type || '', derivate.addedZIndex || 0);
      }

      if (!sprite.FIRST_TIME_ADDED) {
        sprite.FIRST_TIME_ADDED = true;
        if (sprite.confirm !== undefined) sprite.confirm();
      }
    }
  }, {
    key: "remove",
    value: function remove(sprite, type) {
      for (var s in sprite.derivates) {
        sprite.derivates[s].destroy({
          children: true
        });
        if (sprite.derivates[s].type) type = sprite.derivates[s].type;
      }

      sprite.destroy({
        children: true
      });

      if (this[type]) {
        this[type].visible = true;
        this[type + 'Sprite'].visible = false;
        this.renderTexture(type);
      }
    }
  }, {
    key: "renderTexture",
    value: function renderTexture(type) {
      var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (delay) {
        var self = this;
        clearTimeout(this[type + 'RenderDelay']);
        this[type + 'RenderDelay'] = setTimeout(function () {
          self.renderTexture(type, false);
        }, 1000);
        return;
      }

      var bounds = this[type].getLocalBounds(),
          w = Math.ceil(bounds.width),
          h = Math.ceil(bounds.height),
          texture = pixi_js__WEBPACK_IMPORTED_MODULE_0__["RenderTexture"].create(w, h);
      console.log('Face.renderTexture', type, w, 'x', h);
      this[type].x = -bounds.left;
      this[type].y = -bounds.top;
      App__WEBPACK_IMPORTED_MODULE_4__["App"].App.renderer.render(this[type], texture);
      this[type + 'Sprite'].texture = texture;
      this[type + 'Sprite'].x = bounds.left;
      this[type + 'Sprite'].y = bounds.top;
      this[type + 'Sprite'].visible = true;
      this[type].x = 0;
      this[type].y = 0;
      this[type].visible = false;
    }
  }]);

  return Face;
}(pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]);

Object(HotModule__WEBPACK_IMPORTED_MODULE_5__["HotModule"])(module, Face);
/*get tint(){ return this._tint || 0xffffff; };
	set tint(tint){
		this._tint = tint;
		this.children.forEach( (child) => {
			child.tint = tint;
		})

	}*/
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/Ghost.js":
/*!*******************************!*\
  !*** ./src/lib/grid/Ghost.js ***!
  \*******************************/
/*! exports provided: Ghost */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ghost", function() { return Ghost; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var grid_Stamp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Stamp */ "./src/lib/grid/Stamp.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Ghost =
/*#__PURE__*/
function (_PIXI$Sprite) {
  _inherits(Ghost, _PIXI$Sprite);

  function Ghost(texture) {
    var _this;

    _classCallCheck(this, Ghost);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ghost).call(this, texture));
    _this.enabled = false;
    return _this;
  }

  _createClass(Ghost, [{
    key: "coordinates",
    value: function coordinates(obj) {
      obj.x = Math.round(obj.x / interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[0]) * interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[0];
      obj.y = Math.round(obj.y / interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[1]) * interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[1];

      if (obj.x !== this.cx || obj.y !== this.cy) {
        //console.log('Ghost.coordinates', obj);
        this.cx = obj.x;
        this.cy = obj.y;
        grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].position(this);
      }
    }
  }, {
    key: "confirm",
    value: function confirm() {
      console.log('Ghost.confirm', this.textureDataId);
      var left = this.cx - Math.floor(interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[0] * 0.5),
          top = this.cy - Math.floor(interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[1] * 0.5),
          selection = [];
      var x, y;

      for (x = left; x < left + interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[0]; x++) {
        for (y = top; y < top + interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size[0]; y++) {
          selection.push(App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
            x: x,
            y: y
          }, true, true));
        }
      }

      var stamp = new grid_Stamp__WEBPACK_IMPORTED_MODULE_4__["Stamp"](interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][this.textureDataId], selection);
      App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.data.add(this.textureDataId, stamp.selection);
      this.enabled = false;
    }
  }, {
    key: "textureDataId",
    get: function get() {
      return this._textureDataId;
    },
    set: function set(id) {
      if (id && interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][id] && interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][id].type === 'surface' && this.textureDataId !== id) {
        console.log('Ghost.textureDataId', id);
        this._textureDataId = id;
        this.texture = pixi_js__WEBPACK_IMPORTED_MODULE_0__["Texture"].from(interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][id].images.main.url);
        grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(this, interface_Interface__WEBPACK_IMPORTED_MODULE_1__["GhostTile"].size);
      }
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(bool) {
      if (this._enabled !== bool) {
        this._enabled = bool;
        this.visible = bool;
      }
    }
  }]);

  return Ghost;
}(pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"]);

Object(HotModule__WEBPACK_IMPORTED_MODULE_5__["HotModule"])(module, Ghost);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/Grid.js":
/*!******************************!*\
  !*** ./src/lib/grid/Grid.js ***!
  \******************************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var pathfinding__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! pathfinding */ "./node_modules/pathfinding/index.js");
/* harmony import */ var pathfinding__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pathfinding__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ResizeHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ResizeHandler */ "./src/lib/static/ResizeHandler.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var grid_Stamp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Stamp */ "./src/lib/grid/Stamp.js");
/* harmony import */ var grid_Face__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grid/Face */ "./src/lib/grid/Face.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var grid_Data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! grid/Data */ "./src/lib/grid/Data.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_Ghost__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! grid/Ghost */ "./src/lib/grid/Ghost.js");
/* harmony import */ var grid_types_Road__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! grid/types/Road */ "./src/lib/grid/types/Road.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var Grid =
/*#__PURE__*/
function (_PIXI$Container) {
  _inherits(Grid, _PIXI$Container);

  function Grid() {
    var _this;

    _classCallCheck(this, Grid);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Grid).call(this));
    App__WEBPACK_IMPORTED_MODULE_8__["App"].register(_assertThisInitialized(_this)); // BG

    _this.background = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"](pixi_js__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE));
    _this.background.tint = 0xff0000;
    _this.background.alpha = 0.001; // ADD THE FACE OOF THE GRID

    _this.face = _this.addChild(new grid_Face__WEBPACK_IMPORTED_MODULE_5__["Face"]());
    _this.stamp = _this.addChild(new grid_Stamp__WEBPACK_IMPORTED_MODULE_4__["Stamp"]());
    _this.stamp.alpha = 1;
    _this.ghost = _this.addChild(new grid_Ghost__WEBPACK_IMPORTED_MODULE_9__["Ghost"]());
    _this.ghost.alpha = 0.5; // ADD THE CONTAINER FOR INTERACTIVE TILES

    _this.container = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]());
    _this.tiles = {};
    _this.size = {
      reset: function reset() {
        this.minx = Number.MAX_SAFE_INTEGER;
        this.maxx = -Number.MAX_SAFE_INTEGER;
        this.miny = Number.MAX_SAFE_INTEGER;
        this.maxy = -Number.MAX_SAFE_INTEGER;
        return this;
      },

      get width() {
        return this.maxx - this.minx + 1;
      },

      get height() {
        return this.maxy - this.miny + 1;
      },

      add: function add(x, y) {
        this.minx = Math.min(x, this.minx);
        this.miny = Math.min(y, this.miny);
        this.maxx = Math.max(x, this.maxx);
        this.maxy = Math.max(y, this.maxy);
        return this;
      },
      update: function update() {
        this.reset();
        var x, y;

        for (x in App__WEBPACK_IMPORTED_MODULE_8__["App"].Grid.tiles) {
          for (y in App__WEBPACK_IMPORTED_MODULE_8__["App"].Grid.tiles[x]) {
            this.add(x, y);
          }
        }

        return this;
      }
    }.reset(); // HOLDER CLASS FOR THE MAP-DATA

    _this.data = new grid_Data__WEBPACK_IMPORTED_MODULE_7__["Data"](); // PATHFINDER INSTANCE

    _this.finder = new pathfinding__WEBPACK_IMPORTED_MODULE_1__["AStarFinder"]({
      allowDiagonal: false
    }); // INTERACTION

    _this.interactive = true;

    _this.on('pointerdown', function (e) {
      _this.pointer(e);
    });

    _this.on('pointermove', function (e) {
      _this.pointer(e);
    });

    _this.on('pointerup', function (e) {
      _this.pointer(e);
    });

    _this.on('pointertap', function (e) {
      _this.pointer(e);
    });

    _this.on('pointercancel', function (e) {
      _this.pointer(e);
    });

    _this.on('pointerout', function (e) {
      _this.pointer(e);
    }); // RANDOM KIWI LAND!!!

    /*for(var i=0; i<400;i++){
    	var rand = this.rand();
    	if( rand && !rand.water ){
    		new Kiwi(rand);
    	}
    }*/


    return _this;
  } // ADD TILE


  _createClass(Grid, [{
    key: "add",
    value: function add(x, y) {
      if (!this.tiles[x]) this.tiles[x] = {};
      if (!this.tiles[x][y]) this.tiles[x][y] = this.container.addChild(new grid_Tile__WEBPACK_IMPORTED_MODULE_3__["Tile"](x, y)); //console.log('Grid.add', x, y);

      this.size.add(x, y);
      this.tiles[x][y].neighbours(true).forEach(function (tile) {
        tile._neighboursRequireUpdate = true;
      });
      grid_Transform__WEBPACK_IMPORTED_MODULE_6__["Transform"].position(grid_Transform__WEBPACK_IMPORTED_MODULE_6__["Transform"].transform(this.tiles[x][y]));
      return this.tiles[x][y];
    }
  }, {
    key: "remove",
    value: function remove(x, y) {
      if (!this.tiles[x]) return false;
      if (!this.tiles[x][y]) return false;
      this.tiles[x][y].neighbours(true).forEach(function (tile) {
        tile._neighboursRequireUpdate = true;
      });
      this.tiles[x][y].destroy({
        children: true
      });
      delete this.tiles[x][y]; // UPDATE GRIDSIZE

      this.size.update();
      return true;
    }
  }, {
    key: "rand",
    value: function rand() {
      var ka = Object.keys(this.tiles);
      if (ka.length === 0) return undefined;
      var ra = ka[Math.floor(Math.random() * ka.length)],
          kb = Object.keys(this.tiles[ra]);
      if (kb.length === 0) return undefined;
      var rb = kb[Math.floor(Math.random() * kb.length)];
      return this.tiles[ra][rb];
    }
  }, {
    key: "updateScale",
    value: function updateScale() {
      var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.scale.x;
      var orig = this.toLocal({
        x: this.screen.width * 0.5,
        y: this.screen.height * 0.5
      });
      this.scale.set(scale);
      this.background.padding = 0; //10 / scale;

      this.background.width = this.screen.width / this.scale.x - this.background.padding * 2;
      this.background.height = this.screen.height / this.scale.y - this.background.padding * 2;
      var next = this.toLocal({
        x: this.screen.width * 0.5,
        y: this.screen.height * 0.5
      });
      this.drag((next.x - orig.x) * this.scale.x, (next.y - orig.y) * this.scale.y);
    }
  }, {
    key: "drag",
    value: function drag(dx, dy) {
      // DISABLE TAP HANDLING
      if (dx !== 0 || dy !== 0) this.__pd_time = Date.now() - 10000;
      this.x += dx;
      this.y += dy;
      this.background.x = -(this.x / this.scale.x) + this.background.padding;
      this.background.y = -(this.y / this.scale.y) + this.background.padding;
    } // GET TILE

  }, {
    key: "getTile",
    value: function getTile(c) {
      var isCoordinate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var create = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (!c) return undefined;
      if (!isCoordinate) c = grid_Transform__WEBPACK_IMPORTED_MODULE_6__["Transform"].p2c(c.x - this.x, c.y - this.y);

      if (create && (!this.tiles[c.x] || !this.tiles[c.x][c.y])) {
        // AUTOCREATE
        this.add(c.x, c.y);
      }

      if (!this.tiles[c.x]) return undefined;
      return this.tiles[c.x][c.y];
    } // GET TILE ARRAY

  }, {
    key: "getTileArray",
    value: function getTileArray(tile, interfaceSelection) {
      if (!tile) return [];
      var cx = tile.cx,
          cy = tile.cy,
          a = [],
          x,
          y,
          selectTile;

      if (interfaceSelection.modulo) {
        cx = Math.round(cx / interfaceSelection.size[0]) * interfaceSelection.size[0];
        cy = Math.round(cy / interfaceSelection.size[1]) * interfaceSelection.size[1];
      }

      var left = cx - Math.ceil(interfaceSelection.size[0] * 0.5) + 1,
          top = cy - Math.ceil(interfaceSelection.size[1] * 0.5) + 1;

      if (left < this.size.minx || left + interfaceSelection.size[0] > this.size.maxx + 1 || top < this.size.miny || top + interfaceSelection.size[1] > this.size.maxy + 1) {
        if (interfaceSelection.modulo) {
          // iNVALID
          return [];
        } else {
          // LIMIT
          left = Math.min(Math.max(left, this.size.minx), this.size.maxx - interfaceSelection.size[0] + 1), top = Math.min(Math.max(top, this.size.miny), this.size.maxy - interfaceSelection.size[1] + 1);
        }
      }

      for (x = left; x < left + interfaceSelection.size[0]; x++) {
        for (y = top; y < top + interfaceSelection.size[1]; y++) {
          selectTile = this.getTile({
            x: x,
            y: y
          }, true);

          if (selectTile) {
            a.push(selectTile);
          }
        }
      }

      if (a.length !== interfaceSelection.size[0] * interfaceSelection.size[1]) return [];
      return a;
    }
  }, {
    key: "updateStamp",
    value: function updateStamp(interfaceSelection) {
      if (this._interfaceSelection !== interfaceSelection) {
        // CACHE
        this._interfaceSelection = interfaceSelection; // PASS TO STAMP

        this.stamp.textureData = interfaceSelection; // APPLY TO GHOST TILES

        this.ghost.textureDataId = interfaceSelection.id; //

        this.container.visible = true; //interfaceSelection ? true : false;
      }
    }
  }, {
    key: "pointer",
    value: function pointer(e) {
      switch (e.type) {
        case 'pointerdown':
          this.__pd_time = Date.now();
          this.__pd = true;
          this.__ps = e.data.getLocalPosition(this.parent, this.__ps);
          this.__pp = this.__ps.clone();
          this.__tile = this.getTile(this.__ps, false);

          if (this.__tile) {
            console.log(this.__tile.toString(), this.__tile.content.keys);
          }

          this.hover();

          if (this.ghost.enabled) {
            this.ghost.confirm();
          }

          break;

        case 'pointermove':
          this.__pc = e.data.getLocalPosition(this.parent, this.__pc);

          if (this.mode === 'drag' && this.__pd) {
            this.drag(this.__pc.x - this.__pp.x, this.__pc.y - this.__pp.y);
          } else {
            this.hover();
          }

          this.__pp = this.__pc.clone();
          break;

        case 'pointerup':
        case 'pointercancel':
        case 'pointerout':
          delete this.__ps;
          delete this.__pc;
          delete this.__pp;
          this.__pd = false;
          if (e.type === 'pointerup') this.confirm();
          break;

        case 'pointertap':
          if (this.mode === 'drag' && Date.now() - this.__pd_time < 200) {
            App__WEBPACK_IMPORTED_MODULE_8__["App"].Interface.tile = this.__tile;
          }

          break;
      }
    }
  }, {
    key: "hover",
    value: function hover() {
      var _this2 = this;

      // UNHOVER
      if (this._hover) this._hover.forEach(function (tile) {
        tile.hover(false);
      }); // CLEAR

      this._hover = [];
      var interfaceSelection = Object.assign({
        size: [1, 1],
        modulo: false
      }, App__WEBPACK_IMPORTED_MODULE_8__["App"].Interface.selected()); // GET SELECTION

      if (this.mode === 'drag') {
        var _tile = this.getTile(this.__pc, false);

        if (_tile) this._hover = [_tile];
      } else if ((this.mode === 'road' || this.mode === 'fence') && this.__ps) {
        this._hover = this.path(this.getTile(this.__ps, false), this.getTile(this.__pc, false));
      } else if (this.mode.indexOf('destroy') !== -1) {
        // DESTROY MODE HANDLING
        var what = this.mode.split('-')[1],
            tile = this.getTile(this.__pc, false);

        if (tile && tile.content.contains(what)) {
          this._hover = tile.content.select(what); // SURFACE DESTROY DESTROY EVERYTHING ON ITS TILES

          if (this.mode === 'destroy-surface') {
            var _extendedHover = [];

            this._hover.forEach(function (tile) {
              tile.content.select('road|build|fence').forEach(function (associatedTile) {
                if (_this2._hover.indexOf(associatedTile) === -1 && _extendedHover.indexOf(associatedTile) === -1) {
                  _extendedHover.push(associatedTile);
                }
              });
            });

            this._hover = this._hover.concat(_extendedHover);
          }
        }
      } else {
        this._hover = this.getTileArray(this.getTile(this.__pc, false), interfaceSelection);
      } // POSITION THE STAMP-TOOL


      this.stamp.selection = this._hover; // HANDLING CREATION OF NEW TILES

      this.ghost.enabled = this.mode === 'surface' && !this._hover.length;

      if (this.ghost.enabled) {
        this.ghost.coordinates(grid_Transform__WEBPACK_IMPORTED_MODULE_6__["Transform"].p2c(this.__pc.x - this.x, this.__pc.y - this.y));
      } // AUTO-CONFIRM


      if (this.__pd && (this.mode === 'destroy-surface' || // AUTO-CONFIRM SURFACE DESTRUCTION
      this.mode === 'destroy-road' || // AUTO-CONFIRM ROAD DESTRUCTION
      this.mode === 'destroy-fence' || // AUTO-CONFIRM FENCE DESTRUCTION
      this.mode === 'destroy-kiwi' || // AUTO-CONFIRM KIWI DESTRUCTION
      this.mode === 'surface' && this._hover.length || // AUTO-CONFIRM SURFACE PLACEMENT
      this.ghost.enabled // AUTO-CONFIRM TILE-CREATION
      )) {
        if (this.ghost.enabled) {
          this.ghost.confirm();
        } else {
          this.confirm();
        }

        return;
      } // GET STAMP VALIDITY


      this.stamp.valid = this._hover.every(function (tile) {
        return tile.content.testSurface(_this2.stamp.textureData.surface || '');
      }); // SHOW HOVERING

      var color = 0xffffff,
          alpha = 0.3;

      if (!this.stamp.valid) {
        color = 0xff0000;
      } else if (this.mode.indexOf('destroy') !== -1) {
        color = 0xff0000;
      } else if (this.mode === 'drag') {
        color = 0x000000;
      } else {
        color = 0x00ff00;
      }

      this._hover.forEach(function (tile) {
        tile.hover(color, alpha);
      });
    }
  }, {
    key: "confirm",
    value: function confirm() {
      if (this._hover.length === 0) return;

      if (this.mode.indexOf('destroy') !== -1) {
        if (this.mode === 'destroy-surface') {
          this.data.destroy(this._hover);
          this._hover = [];
        } else {
          this.data.remove(this.mode.split('-')[1], this._hover);
        }
      } else if (this.stamp.textureData && this.stamp.valid) {
        var _added = this.data.add(this.stamp.textureData.id, this.stamp.selection);
      }
    }
  }, {
    key: "path",
    value: function path(from, to) {
      var testSurface = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.stamp.textureData.surface;
      console.log('path');
      if (!from || !to) return [];
      if (!from.content.testSurface(testSurface)) return [];
      if (!to.content.testSurface(testSurface)) return []; // CREATE A NEW PATHFINDER GRID

      var x,
          y,
          tile,
          bool,
          grid = new pathfinding__WEBPACK_IMPORTED_MODULE_1__["Grid"](this.size.width, this.size.height); // ANALYSE SURFACE

      for (y = 0; y < this.size.height; y++) {
        for (x = 0; x < this.size.width; x++) {
          tile = this.getTile({
            x: x + this.size.minx,
            y: y + this.size.miny
          }, true);
          bool = tile && tile.content.testSurface(testSurface);
          grid.setWalkableAt(x, y, bool);
        }
      } // GET RESULTS


      var result = this.finder.findPath(from.cx - this.size.minx, from.cy - this.size.miny, to.cx - this.size.minx, to.cy - this.size.miny, grid); // CONVERT RESULTS TO TILE-ARRAY

      var i,
          n = result.length;

      for (i = 0; i < n; i++) {
        result[i] = this.getTile({
          x: result[i][0] + this.size.minx,
          y: result[i][1] + this.size.miny
        });
      }

      return result;
    }
  }, {
    key: "screen",
    get: function get() {
      return this._screen;
    },
    set: function set(rect) {
      var cx = 0,
          cy = 0;

      if (!this._screen) {
        this.x = rect.width * 0.5;
        this.y = rect.height * 0.5;
      } else {
        cx = (rect.width - this._screen.width) * 0.5;
        cy = (rect.height - this._screen.height) * 0.5;
        this.drag(cx, cy);
      }

      this._screen = rect.clone();
      this.updateScale();
    }
  }, {
    key: "mode",
    get: function get() {
      return App__WEBPACK_IMPORTED_MODULE_8__["App"].Interface.mode();
    }
  }]);

  return Grid;
}(pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]);

Object(HotModule__WEBPACK_IMPORTED_MODULE_11__["HotModule"])(module, Grid);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/Stamp.js":
/*!*******************************!*\
  !*** ./src/lib/grid/Stamp.js ***!
  \*******************************/
/*! exports provided: Stamp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stamp", function() { return Stamp; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var grid_Texture__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grid/Texture */ "./src/lib/grid/Texture.js");
/* harmony import */ var grid_types_Type__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! grid/types/Type */ "./src/lib/grid/types/Type.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Stamp =
/*#__PURE__*/
function (_PIXI$Container) {
  _inherits(Stamp, _PIXI$Container);

  function Stamp() {
    var _this;

    var interfaceSelection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var selectedTiles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Stamp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Stamp).call(this));
    _this.sprites = [];
    _this.textureData = interfaceSelection;
    _this.selection = selectedTiles;
    return _this;
  } // GET/SET THE TEXTUREDATA ELEMENT


  _createClass(Stamp, [{
    key: "textureData",
    get: function get() {
      return this._textureData;
    },
    set: function set(textureData) {
      var _this2 = this;

      if (textureData !== this.textureData) {
        this._textureData = textureData;

        if (this.textureData) {
          this.mode = this.textureData.type;
          this.visible = true;
        } else {
          this.mode = undefined;
          this.visible = false;
        } //console.log('Stamp.mode:', this.mode, this.sprites.length);


        this.multiSpriteMode = ['fence', 'road'].indexOf(this.mode) !== -1;
        this.sprites.forEach(function (sprite, index, array) {
          if (sprite.type !== _this2.mode) {
            grid_types_Type__WEBPACK_IMPORTED_MODULE_6__["Generic"].destroy(sprite);
            array[index] = _this2.addChild(grid_types_Type__WEBPACK_IMPORTED_MODULE_6__["Generic"].create(_this2.mode, _this2.textureData.id, _this2.selection, index));
            array[index].visible = _this2.visible;
          }
        });
      }
    } // GET / SET SELECTED TILES

  }, {
    key: "selection",
    get: function get() {
      return this._selection || [];
    },
    set: function set(selection) {
      var _this3 = this;

      var _selectionHasChanged = !this.selection || this.selection.length !== selection.length || selection.some(function (v, i, a) {
        if (_this3._selection[i] !== selection[i]) {
          return true;
        }
      }, this);

      if (_selectionHasChanged) {
        this._selection = selection;

        if (this.mode) {
          if (this.multiSpriteMode) {
            this.length = this.selection.length;
          }

          this.sprites.forEach(function (sprite, index) {
            sprite.index = index;
            sprite.selection = _this3.selection;
          });
        }

        this.visible = this._selection && this._selection.length > 0;
      }
    } // GET/SET THE AMOUNT OF SPRITES FOR THE STAMP

  }, {
    key: "length",
    get: function get() {
      return this.sprites.length;
    },
    set: function set(int) {
      int = Math.max(1, int);

      if (int !== this.length) {
        // ADD SPRITES
        while (this.sprites.length < int) {
          var sprite = this.addChild(grid_types_Type__WEBPACK_IMPORTED_MODULE_6__["Generic"].create(this.mode, this.textureData.id, this.selection, this.sprites.length));
          this.sprites.push(sprite);
        } // REMOVE SPRITES


        while (this.sprites.length > int) {
          grid_types_Type__WEBPACK_IMPORTED_MODULE_6__["Generic"].destroy(this.sprites.splice(0, 1)[0]);
        }
      }
    }
  }, {
    key: "multiSpriteMode",
    get: function get() {
      return this._multiSpriteMode;
    },
    set: function set(bool) {
      if (bool !== this._multiSpriteMode) {
        this._multiSpriteMode = bool;

        if (this.multiSpriteMode) {
          this.length = this.selection.length;
        } else {
          this.length = 1;
        }
      }
    }
  }]);

  return Stamp;
}(pixi_js__WEBPACK_IMPORTED_MODULE_0__["Container"]);

Object(HotModule__WEBPACK_IMPORTED_MODULE_7__["HotModule"])(module, Stamp);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/Texture.js":
/*!*********************************!*\
  !*** ./src/lib/grid/Texture.js ***!
  \*********************************/
/*! exports provided: Texture */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Texture", function() { return Texture; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");

function Texture(textureData) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'main';
  var texture = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Texture"].from(textureData.images[id].url); // ORIGINAL SIZE

  texture.orig = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Rectangle"](0, 0, textureData.orig.width, textureData.orig.height); // TRIMMED AREA

  texture.trim = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Rectangle"](textureData.images[id].trim.left, textureData.images[id].trim.top, textureData.images[id].trim.width, textureData.images[id].trim.height); // UPDATE TEXTURE

  texture.updateUvs();
  return texture;
}

/***/ }),

/***/ "./src/lib/grid/Tile.js":
/*!******************************!*\
  !*** ./src/lib/grid/Tile.js ***!
  \******************************/
/*! exports provided: Tile, TileContent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tile", function() { return Tile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TileContent", function() { return TileContent; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var HotModule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! HotModule.js */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Tile =
/*#__PURE__*/
function (_PIXI$Sprite) {
  _inherits(Tile, _PIXI$Sprite);

  function Tile(cx, cy) {
    var _this;

    _classCallCheck(this, Tile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Tile).call(this, pixi_js__WEBPACK_IMPORTED_MODULE_0__["Texture"].WHITE));
    _this._neighboursRequireUpdate = true;
    _this.content = new TileContent(_assertThisInitialized(_this));
    _this.cx = cx;
    _this.cy = cy;
    return _this;
  }

  _createClass(Tile, [{
    key: "neighbours",
    value: function neighbours() {
      var includeDiagonal = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (this._neighboursRequireUpdate) {
        this._neighbours = [App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx + d,
          y: this.cy
        }), App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx - d,
          y: this.cy
        }), App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx,
          y: this.cy + d
        }), App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx,
          y: this.cy - d
        })].filter(function (tile) {
          return tile ? true : false;
        });
        this._diagonalNeighbours = [App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx + d,
          y: this.cy - d
        }), App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx + d,
          y: this.cy + d
        }), App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx - d,
          y: this.cy - d
        }), App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.getTile({
          x: this.cx - d,
          y: this.cy + d
        })].filter(function (tile) {
          return tile ? true : false;
        });
        this._neighboursRequireUpdate = false;
      }

      if (includeDiagonal) {
        return this._diagonalNeighbours.slice(0).concat(this._neighbours);
      } else {
        return this._neighbours;
      }
    }
  }, {
    key: "hover",
    value: function hover(color) {
      var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.15;
      this._hoverColor = color;
      this._hoverAlpha = alpha;
      this.updateTint();
    }
  }, {
    key: "updateVariables",
    value: function updateVariables() {
      var _this2 = this;

      var updateNeighbours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.water = this.content.contains('surface/water') || this.content.contains('build/lake');
      this.build = this.content.contains('build/');
      this.fence = this.content.contains('fence/');
      this.surface = this.content.contains('surface/');
      this.road = this.content.contains('road/');
      this.kiwi = this.content.contains('kiwi/') ? this.content.getSprites('kiwi/')[0] : false;
      this.surfaceOffset = 0;
      this.offsetSurfaceScale = 1;

      if (this.road) {
        this.content.getSprites('road/').forEach(function (road) {
          if (road.surfaceOffset && road.surfaceOffset > _this2.surfaceOffset) {
            _this2.surfaceOffset = road.surfaceOffset;
            _this2.offsetSurfaceScale = road.scale.y;
          }
        });
      }

      this.beach = !this.water && !this.content.contains('surface/sand') && this.neighbours().some(function (tile) {
        return tile.water;
      }) || this.water && this.neighbours().some(function (tile) {
        return tile.content.contains('surface/sand');
      });
      this.updateTint();

      if (updateNeighbours) {
        this.neighbours(true).forEach(function (tile) {
          tile.updateVariables();
        });
      }
    }
  }, {
    key: "updateTint",
    value: function updateTint() {
      this.alpha = 0.15;
      this.tint = 0xffffff;

      if (this.water) {
        this.tint = 0x0000ff;
      }

      if (this.fence) {
        this.tint = 0x555555;
      }

      if (this.beach) {
        this.tint = 0xffaa00;
      }

      if (this.build) {
        this.tint = 0xff00ff;
      }

      if (typeof this._hoverColor === 'number') {
        this.tint = this._hoverColor;
        this.alpha = this._hoverAlpha;
      }

      if ((this.cx + this.cy) % 2 === 0) this.alpha += 0.1;
    }
  }, {
    key: "toString",
    value: function toString() {
      return '[Tile ' + this.cx + ' ' + this.cy + ']';
    }
  }, {
    key: "destroy",
    get: function get() {
      return this._selected;
    },
    set: function set(boolean) {
      this._destroy = boolean;
      this.updateTint();
    }
  }]);

  return Tile;
}(pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"]);

Tile.width = 64;
Tile.ratio = 0.666667;
Tile.height = Tile.width * Tile.ratio;
Tile.diameter = Math.sqrt(Tile.height * Tile.height + Tile.width * Tile.width);
Tile.halfWidth = Tile.width * 0.5;
Tile.halfHeight = Tile.height * 0.5;
Tile.skewX = Math.atan2(Tile.width, Tile.height);
Tile.skewY = Math.atan2(-Tile.height, Tile.width);

var TileContent =
/*#__PURE__*/
function () {
  function TileContent(tile) {
    _classCallCheck(this, TileContent);

    this.keys = [];
    this.nodes = [];
    this.tile = tile;
  }

  _createClass(TileContent, [{
    key: "testSurface",
    value: function testSurface(expr) {
      var negate = expr.charAt(0) === '!';
      if (negate) expr = expr.substr(1);
      var regexp = new RegExp(expr, 'i'),
          keyString = this.keys.join(', '),
          result = regexp.test(keyString);
      if (expr.indexOf('beach') !== -1) result = result || this.tile.beach;
      if (negate) result = !result;
      return result;
    }
  }, {
    key: "add",
    value: function add(id, node) {
      if (this.keys.indexOf(id) === -1) {
        //console.log( this.tile.toString() + '.content.add', node.id);
        // REGISTER THE NEW CONTENT
        this.keys.push(id);
        this.nodes.push(node); // APPEND TO FACE

        node.sprites.forEach(function (sprite) {
          App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.face.add(sprite, interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][node.id].type);
        });
        this.tile.updateVariables(true);
        return true;
      } else {
        return false;
      }
    } // REMOVE CONTENT FROM TILE

  }, {
    key: "remove",
    value: function remove(wildcard) {
      var regex = new RegExp(wildcard, 'i');
      console.log('TileContent.remove', wildcard, this.keys); //, node );

      for (var index = this.keys.length - 1; index >= 0; index--) {
        // CHECK CONTENT ID WILDCARD IS IN THE KEYS 
        if (regex.test(this.keys[index])) {
          // REMOVE KEY FROM TILE
          var key = this.keys.splice(index, 1)[0]; //console.log( 'TileContent.remove', key) //, node );
          // REMOVE NODE FROM TILE

          var node = this.nodes.splice(index, 1)[0];
          var tileIndex = node.tiles.indexOf(this.tile),
              spriteIndex = tileIndex % node.sprites.length;

          if (!isNaN(spriteIndex)) {
            // REMOVE SPRITE FROM NODE
            App__WEBPACK_IMPORTED_MODULE_2__["App"].Grid.face.remove(node.sprites.splice(spriteIndex, 1)[0], interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][node.id].type);
          } // REMOVE TILE FROM NODE


          node.tiles.splice(tileIndex, 1);
        }
      }

      this.tile.updateVariables(true);
    }
  }, {
    key: "move",
    value: function move(sprite, to) {
      var index = -1,
          exists = this.nodes.some(function (n, i, a) {
        return n.sprites.some(function (s) {
          if (s === sprite) {
            index = i;
            return true;
          } else {
            return false;
          }
        });
      }); //console.log('Tile.content.move', this.tile.toString(), '>', to.toString() , exists, this.nodes[index]);

      if (exists) {
        var node = this.nodes[index],
            added = to.content.add(node.id, node);

        if (added) {
          // UPDATE REGISTERED TILE
          node.tiles = [to]; // REMOVE NODE

          this.keys.splice(index, 1);
          this.nodes.splice(index, 1)[0];
          this.tile.updateVariables();
          return to;
        } else {
          // FAILED
          console.warn('could not move content', sprite, 'from', this.tile.toString(), '>', to.toString());
          return this.tile;
        }
      } else {
        console.warn('could not move content', sprite, 'from', this.tile.toString(), '>', to.toString());
        return this.tile;
      }
    }
  }, {
    key: "contains",
    value: function contains(wildcard) {
      var regex = new RegExp(wildcard, 'i');
      return this.keys.some(function (v, i, a) {
        return regex.test(v);
      });
    }
  }, {
    key: "select",
    value: function select(wildcard) {
      var _this3 = this;

      var regex = new RegExp(wildcard, 'i'),
          tiles = [];
      this.keys.forEach(function (v, index, a) {
        // CHECK CONTENT ID WILDCARD IS IN THE KEYS 
        if (regex.test(v)) {
          tiles = tiles.concat(_this3.nodes[index].tiles);
        }
      });
      return tiles;
    }
  }, {
    key: "getDataNodes",
    value: function getDataNodes(wildcard) {
      var _this4 = this;

      var regex = new RegExp(wildcard, 'i'),
          data = [];
      this.keys.forEach(function (v, index, a) {
        // CHECK CONTENT ID WILDCARD IS IN THE KEYS 
        if (regex.test(v)) {
          data = data.concat(_this4.nodes[index]);
        }
      });
      return data;
    }
  }, {
    key: "getSprites",
    value: function getSprites(wildcard) {
      var _this5 = this;

      var regex = new RegExp(wildcard, 'i'),
          sprites = [];
      this.keys.forEach(function (v, index, a) {
        // CHECK CONTENT ID WILDCARD IS IN THE KEYS 
        if (regex.test(v)) {
          var node = _this5.nodes[index],
              tileIndex = node.tiles.indexOf(_this5.tile),
              spriteIndex = tileIndex % node.sprites.length;

          if (!isNaN(spriteIndex)) {
            // REMOVE SPRITE FROM NODE
            sprites.push(node.sprites[spriteIndex]);
          }
        }
      });
      return sprites;
    }
  }, {
    key: "toString",
    value: function toString() {
      return '[' + this.keys.join(',') + ']';
    }
  }]);

  return TileContent;
}();



Object(HotModule_js__WEBPACK_IMPORTED_MODULE_3__["HotModule"])(module, Tile, TileContent);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/Transform.js":
/*!***********************************!*\
  !*** ./src/lib/grid/Transform.js ***!
  \***********************************/
/*! exports provided: Transform */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transform", function() { return Transform; });
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! HotModule */ "./HotModule.js");


var Transform = {
  name: 'Transform',
  // COORDINATES TO POINT
  c2p: function c2p(cx, cy) {
    return {
      x: (cx + cy) * grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].halfWidth,
      y: (cy - cx) * grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].halfHeight
    };
  },
  // POINT TO COORDINATES
  p2c: function p2c(x, y) {
    x /= App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.scale.x;
    y /= App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.scale.y;
    var cx = (x / grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].halfWidth - y / grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].halfHeight) / 2,
        cy = y / grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].halfHeight + cx;
    return {
      x: Math.round(cx),
      y: Math.round(cy)
    };
  },
  // SET POSITION BASED ON COORDINATES
  position: function position(sprite) {
    var p = Transform.c2p(sprite.cx, sprite.cy);
    sprite.x = p.x;
    sprite.y = p.y;
  },
  // UPDATE TRANSFORMATION
  transform: function transform(sprite) {
    var span = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [1, 1];
    var skewX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var skewY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var overflow = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1.01;
    var spanWidth = (span[0] + span[1]) * 0.5;
    sprite.anchor.set(0.5);
    sprite.pivot.set(0);

    if (skewX || skewY) {
      sprite.scale.set(grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].diameter * 0.5 * spanWidth / sprite.texture.width * overflow);
    } else {
      sprite.scale.set(grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].width * spanWidth / sprite.texture.width * overflow);
    }

    sprite.skew.set(skewX ? grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].skewX : 0, skewY ? grid_Tile__WEBPACK_IMPORTED_MODULE_0__["Tile"].skewY : 0);
    return sprite;
  }
};


Object(HotModule__WEBPACK_IMPORTED_MODULE_2__["HotModule"])(module, Transform);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/types/Build.js":
/*!*************************************!*\
  !*** ./src/lib/grid/types/Build.js ***!
  \*************************************/
/*! exports provided: Build */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Build", function() { return Build; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_types_Generic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/types/Generic */ "./src/lib/grid/types/Generic.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var grid_Texture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Texture */ "./src/lib/grid/Texture.js");
/* harmony import */ var HotModule_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! HotModule.js */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Build =
/*#__PURE__*/
function (_Generic) {
  _inherits(Build, _Generic);

  function Build(texture) {
    var _this;

    _classCallCheck(this, Build);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Build).call(this, texture)); //this.on('enable', ()=>{});
    //this.on('disable', ()=>{});

    _this.on('update', function () {
      // TRANSFORM SELF
      grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(_assertThisInitialized(_this), _this.textureData.size, _this.textureData.skewX, _this.textureData.skewY);

      _this.anchor.set(0.5, 1);

      if (_this.textureData.images.surface) {
        _this.addDerivate('surface');

        _this.parent.addChildAt(_this.derivates.surface, _this.parent.getChildIndex(_assertThisInitialized(_this)));

        _this.derivates.surface.type = 'surface';
        _this.derivates.surface.addedZIndex = 1000000;
        _this.derivates.surface.texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_4__["Texture"])(_this.textureData, 'surface'); // TRANSFORM SURFACE

        grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(_this.derivates.surface, _this.textureData.size, _this.textureData.skewX, _this.textureData.skewY);

        _this.derivates.surface.anchor.set(0.5, 1);
      } else {
        _this.destroyDerivate('surface');
      }
    });

    _this.on('update-position', function () {
      _this.x = _this.limits.x;
      _this.y = _this.limits.bottom;

      if (_this.derivates.surface) {
        _this.derivates.surface.x = _this.x;
        _this.derivates.surface.y = _this.y;
      }
    });

    return _this;
  }

  return Build;
}(grid_types_Generic__WEBPACK_IMPORTED_MODULE_2__["Generic"]);

Object(HotModule_js__WEBPACK_IMPORTED_MODULE_5__["HotModule"])(module, Build);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/types/Fence.js":
/*!*************************************!*\
  !*** ./src/lib/grid/types/Fence.js ***!
  \*************************************/
/*! exports provided: Fence */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fence", function() { return Fence; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var grid_types_Generic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/types/Generic */ "./src/lib/grid/types/Generic.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var HotModule_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! HotModule.js */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Fence =
/*#__PURE__*/
function (_Generic) {
  _inherits(Fence, _Generic);

  function Fence(sprite) {
    var _this;

    _classCallCheck(this, Fence);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Fence).call(this, sprite));

    _this.on('enable', function () {
      _this.cc = {
        top: false,
        right: false,
        bottom: false,
        left: false
      };
      _this.mask = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Graphics"]());
    });

    _this.on('disable', function () {
      _this.mask.destroy({
        children: true
      });

      _this.mask = null;
    });

    _this.on('update', function () {
      grid_Transform__WEBPACK_IMPORTED_MODULE_4__["Transform"].transform(_assertThisInitialized(_this), _this.textureData.size, _this.textureData.skewX, _this.textureData.skewY);

      _this.anchor.set(0.5, 1);

      _this.updateDerivates();

      _this.updateConnections();
    });

    _this.on('update-position', function () {
      _this.updateConnections();
    });

    return _this;
  }

  _createClass(Fence, [{
    key: "updateDerivates",
    value: function updateDerivates() {
      var _this2 = this;

      ['bottom', 'top'].forEach(function (id) {
        _this2.addDerivate(id);

        if (!_this2.derivates[id].mask) _this2.derivates[id].mask = _this2.derivates[id].addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Graphics"]());
        _this2.derivates[id].texture = _this2.texture;
        _this2.derivates[id].type = 'fence';
        _this2.derivates[id].addedZIndex = id === 'top' ? -0.1 : 0.1;
        grid_Transform__WEBPACK_IMPORTED_MODULE_4__["Transform"].transform(_this2.derivates[id], _this2.textureData.size, _this2.textureData.skewX, _this2.textureData.skewY);

        _this2.derivates[id].skew.set(_this2.skew.x, -_this2.skew.y);

        _this2.derivates[id].anchor.set(0.5, 1);
      });
      this.clear(this.mask);
      this.clear(this.derivates.top.mask);
      this.clear(this.derivates.bottom.mask); // STACK

      var parent = this.parent;
      parent.addChild(this.derivates.top);
      parent.addChild(this);
      parent.addChild(this.derivates.bottom);
    }
  }, {
    key: "updateConnections",
    value: function updateConnections() {
      var tile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tile;
      var selection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selection;
      if (!tile) return;
      this.x = tile.x;
      this.y = tile.y;
      if (!this.derivates.top || !this.derivates.bottom) this.updateDerivates();
      this.derivates.top.x = tile.x;
      this.derivates.top.y = tile.y;
      this.derivates.bottom.x = tile.x;
      this.derivates.bottom.y = tile.y;
      var connect = {
        top: false,
        bottom: false,
        left: false,
        right: false
      };
      selection.forEach(function (alt, i, a) {
        if (alt !== tile) {
          connect.top = connect.top || tile.cx === alt.cx && tile.cy === alt.cy + 1, connect.bottom = connect.bottom || tile.cx === alt.cx && tile.cy === alt.cy - 1, connect.left = connect.left || tile.cy === alt.cy && tile.cx === alt.cx + 1, connect.right = connect.right || tile.cy === alt.cy && tile.cx === alt.cx - 1;
        }
      });

      if (Object.values(connect).includes(true) === false) {
        connect.left = true;
        connect.right = true;
      }

      var requiresUpdate = connect.top !== this.cc.top || connect.right !== this.cc.right || connect.bottom !== this.cc.bottom || connect.left !== this.cc.left;

      if (requiresUpdate) {
        // CACHE
        this.cc = connect;
        var w = this.texture.orig.width,
            h = this.texture.orig.height,
            hw = w * 0.5,
            hh = h * 0.5;
        this.clear(this.mask);
        this.clear(this.derivates.top.mask);
        this.clear(this.derivates.bottom.mask);

        if (connect.left || connect.right) {
          this.mask.beginFill(0xff0000, 0.5);
          if (connect.right) this.mask.drawRect(0, -h, hw, h);
          if (connect.left) this.mask.drawRect(-hw, -h, hw, h);
          this.mask.endFill();
        }

        if (connect.top) {
          this.derivates.top.mask.beginFill(0xff0000, 0.5);
          this.derivates.top.mask.drawRect(-hw, -h, hw, h);
          this.derivates.top.mask.endFill();
        }

        if (connect.bottom) {
          this.derivates.bottom.mask.beginFill(0xff0000, 0.5);
          this.derivates.bottom.mask.drawRect(0, -h, hw, h);
          this.derivates.bottom.mask.endFill();
        }
      }
    }
  }, {
    key: "clear",
    value: function clear(graphics) {
      graphics.clear();
      graphics.beginFill(0x000000);
      graphics.drawRect(0, 0, 1, 1);
    }
  }], [{
    key: "recursiveConnect",
    value: function recursiveConnect(tile) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var rootNode = array.length === 0;

      if (array.indexOf(tile) === -1) {
        // PUSH START-TILE
        if (tile.content.contains('fence')) {
          array.push(tile);
        } // CHECK MY NEIGHBOURS


        tile.neighbours().forEach(function (v, i, a) {
          if (v.content.contains('fence')) {
            Fence.recursiveConnect(v, array);
          }
        });
      }

      if (rootNode) {
        // CREATE ALL CONNECTIONS
        array.forEach(function (tile, index) {
          tile.content.getSprites('fence').forEach(function (fence) {
            fence.updateConnections(tile, array);
          });
        });
      }
    }
  }]);

  return Fence;
}(grid_types_Generic__WEBPACK_IMPORTED_MODULE_3__["Generic"]);

Object(HotModule_js__WEBPACK_IMPORTED_MODULE_5__["HotModule"])(module, Fence);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/types/Generic.js":
/*!***************************************!*\
  !*** ./src/lib/grid/types/Generic.js ***!
  \***************************************/
/*! exports provided: Generic */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Generic", function() { return Generic; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var grid_Texture__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Texture */ "./src/lib/grid/Texture.js");
/* harmony import */ var grid_Stamp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Stamp */ "./src/lib/grid/Stamp.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Generic =
/*#__PURE__*/
function (_PIXI$Sprite) {
  _inherits(Generic, _PIXI$Sprite);

  function Generic(texture) {
    var _this;

    _classCallCheck(this, Generic);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Generic).call(this, texture));
    _this.derivates = {};
    return _this;
  }

  _createClass(Generic, [{
    key: "addDerivate",
    value: function addDerivate(id) {
      if (!this.derivates[id]) {
        this.derivates[id] = new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"]();
      }

      return this.derivates[id];
    }
  }, {
    key: "destroyDerivate",
    value: function destroyDerivate(id) {
      if (this.derivates[id]) {
        console.log('Generic.destroyDerivate', id);
        this.derivates[id].destroy({
          children: true
        });
        delete this.derivates[id];
      }
    }
  }, {
    key: "destroyAllDerivates",
    value: function destroyAllDerivates() {
      for (var s in this.derivates) {
        this.destroyDerivate(s);
      }
    }
  }, {
    key: "confirm",
    value: function confirm() {
      this.emit('confirm');
    }
  }, {
    key: "type",
    get: function get() {
      return this.constructor.name.toLowerCase();
    }
  }, {
    key: "enabled",
    get: function get() {
      return this._enabled;
    },
    set: function set(bool) {
      if (bool !== this.enabled) {
        this._enabled = bool;

        if (!bool) {
          this.emit('disable');

          if (this.parent instanceof grid_Stamp__WEBPACK_IMPORTED_MODULE_3__["Stamp"]) {
            this.destroyAllDerivates();
          }
        } else {
          this.emit('enable');
        }
      }
    }
  }, {
    key: "textureData",
    get: function get() {
      if (interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][this.textureDataId]) return interface_Interface__WEBPACK_IMPORTED_MODULE_1__["TextureData"][this.textureDataId];
      return undefined;
    }
  }, {
    key: "textureDataId",
    get: function get() {
      return this._textureDataId;
    },
    set: function set(id) {
      if (id !== this.textureDataId) {
        this._textureDataId = id;
        var texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_2__["Texture"])(this.textureData);
        this.texture = texture;
        this.cutoff = this.textureData.cutoff;
        this.surfaceOffset = this.textureData.surfaceOffset;
        this.emit('update');
      }
    }
  }, {
    key: "selection",
    get: function get() {
      return this._selection;
    },
    set: function set(selection) {
      this._selection = selection;
      this._dirtyLimits = true;
      this.emit('update-position');
    }
  }, {
    key: "index",
    get: function get() {
      return this._index || 0;
    },
    set: function set(i) {
      this._index = i;
    }
  }, {
    key: "tile",
    get: function get() {
      if (this.selection && this.selection[this.index]) {
        return this.selection[this.index];
      }

      return false;
    }
  }, {
    key: "limits",
    get: function get() {
      var _this2 = this;

      if (!this._limits || this._dirtyLimits) {
        var max = 1000000;
        this._limits = {
          left: max,
          right: -max,
          top: max,
          bottom: -max
        };
        this.selection.forEach(function (tile, i, a) {
          _this2._limits.top = Math.min(tile.y - grid_Tile__WEBPACK_IMPORTED_MODULE_4__["Tile"].halfHeight, _this2._limits.top);
          _this2._limits.bottom = Math.max(tile.y + grid_Tile__WEBPACK_IMPORTED_MODULE_4__["Tile"].halfHeight, _this2._limits.bottom);
          _this2._limits.left = Math.min(tile.x - grid_Tile__WEBPACK_IMPORTED_MODULE_4__["Tile"].halfWidth, _this2._limits.left);
          _this2._limits.right = Math.max(tile.x + grid_Tile__WEBPACK_IMPORTED_MODULE_4__["Tile"].halfWidth, _this2._limits.right);
        });
        this._limits.height = this._limits.bottom - this._limits.top;
        this._limits.width = this._limits.right - this._limits.left;
        this._limits.x = this._limits.left + this._limits.width * 0.5;
        this._limits.y = this._limits.top + this._limits.height * 0.5;
      }

      return this._limits;
    }
  }]);

  return Generic;
}(pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"]);

/***/ }),

/***/ "./src/lib/grid/types/Kiwi.js":
/*!************************************!*\
  !*** ./src/lib/grid/types/Kiwi.js ***!
  \************************************/
/*! exports provided: Kiwi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Kiwi", function() { return Kiwi; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_types_Generic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/types/Generic */ "./src/lib/grid/types/Generic.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var grid_Texture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Texture */ "./src/lib/grid/Texture.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var HotModule_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! HotModule.js */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Kiwi =
/*#__PURE__*/
function (_Generic) {
  _inherits(Kiwi, _Generic);

  function Kiwi(texture) {
    var _this;

    _classCallCheck(this, Kiwi);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Kiwi).call(this, texture));
    if (!Kiwi.COUNT) Kiwi.COUNT = 1;
    _this.nr = Kiwi.COUNT;
    Kiwi.COUNT++; //this.on('enable', ()=>{});
    //this.on('disable', ()=>{});

    _this.on('update', _this.__onUpdate);

    _this.on('update-position', _this.__onUpdatePosition);

    _this.on('confirm', _this.__onConfirm);

    return _this;
  }

  _createClass(Kiwi, [{
    key: "__onUpdate",
    value: function __onUpdate() {
      // TRANSFORM SELF
      grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(this, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
      this.anchor.set(0.5, 1);

      if (this.textureData.images.shadow) {
        this.addDerivate('shadow');
        this.parent.addChildAt(this.derivates.shadow, this.parent.getChildIndex(this));
        this.derivates.shadow.type = 'shadow';
        this.derivates.shadow.addedZIndex = -1000;
        this.derivates.shadow.texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_4__["Texture"])(this.textureData, 'shadow'); // TRANSFORM SURFACE

        grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(this.derivates.shadow, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
        this.derivates.shadow.anchor.set(0.5, 1);
      } else {
        this.destroyDerivate('shadow');
      }
    }
  }, {
    key: "__onUpdatePosition",
    value: function __onUpdatePosition() {
      //console.log('Kiwi.__onUpdatePosition', this, this.selection);
      this.x = this.limits.x;
      this.y = this.limits.bottom;

      if (this.derivates.shadow) {
        this.derivates.shadow.x = this.x;
        this.derivates.shadow.y = this.y;
      }
    }
  }, {
    key: "__onConfirm",
    value: function __onConfirm() {
      console.log('Kiwi.__onConfirm');
      this.move();
      var self = this;
      window.addEventListener('keydown', function () {
        self.move('rand');
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return '[Kiwi ' + this.nr + ']' + (this.tile ? this.tile.toString() : '[No Tile]');
    }
  }, {
    key: "move",
    value: function move(type) {
      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var dx = 0,
          dy = 0;

      if (type === 'rand') {
        if (Math.random() < 0.5) {
          dx = Math.random() < 0.5 ? -1 : 1;
        } else {
          dy = Math.random() < 0.5 ? -1 : 1;
        }
      }

      var tile = App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.getTile({
        x: this.tile.cx + dx,
        y: this.tile.cy + dy
      }),
          walkable = false;

      if (tile && ( // WALKABLE TESTS
      !tile.water && !tile.fence || tile.road) && !(tile.kiwi && (dx !== 0 || dy !== 0))) {
        walkable = true;
      }

      if (!walkable && type === 'rand' && counter < 10) {
        this.move('rand', counter + 1);
        return;
      }

      if (walkable) {
        /*console.log('Kiwi.move', dx, dy, '>>>', this, tile.toString(), this.tile.toString() );
        	debugger*/
        // UNHOVER
        this.tile.hover(false); // FACING DIRECTION

        var sx = Math.abs(this.scale.x) * (dx < 0 || dy < 0 ? -1 : 1);
        this.scale.set(sx, Math.abs(sx)); // GET NEW POSITION

        var position = grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].c2p(tile.cx, tile.cy);
        this.x = position.x;
        this.y = position.y + grid_Tile__WEBPACK_IMPORTED_MODULE_5__["Tile"].halfHeight - tile.surfaceOffset * tile.offsetSurfaceScale;

        if (this.derivates.shadow) {
          this.derivates.shadow.x = this.x;
          this.derivates.shadow.y = this.y;
        }

        if (tile !== this.tile) {
          this._selection = [this.tile.content.move(this, tile)];
        } // UPDATE Z-INDEXING
        //console.log('Kiwi.move', this.type, surfaceOffset);


        App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.face.add(this, this.type, tile.surfaceOffset);
        this.tile.hover(0x006699, 0.05);
      }
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    },
    set: function set(bool) {
      this._selected = bool;
      this.tint = this._selected ? 0x00ffff : 0xffffff;
    }
  }]);

  return Kiwi;
}(grid_types_Generic__WEBPACK_IMPORTED_MODULE_2__["Generic"]);

Object(HotModule_js__WEBPACK_IMPORTED_MODULE_6__["HotModule"])(module, Kiwi);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/types/Road.js":
/*!************************************!*\
  !*** ./src/lib/grid/types/Road.js ***!
  \************************************/
/*! exports provided: Road */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Road", function() { return Road; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_types_Generic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/types/Generic */ "./src/lib/grid/types/Generic.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var grid_Texture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/Texture */ "./src/lib/grid/Texture.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var HotModule_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! HotModule.js */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }







var Road =
/*#__PURE__*/
function (_Generic) {
  _inherits(Road, _Generic);

  function Road(sprite) {
    var _this;

    _classCallCheck(this, Road);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Road).call(this, sprite));

    _this.on('enable', _this.__onEnable);

    _this.on('disable', _this.__onDisable);

    _this.on('update', _this.__onUpdate);

    _this.on('update-position', _this.__onUpdatePosition);

    return _this;
  }

  _createClass(Road, [{
    key: "__onEnable",
    value: function __onEnable() {}
  }, {
    key: "__onDisable",
    value: function __onDisable() {
      if (this.mask) {
        this.mask.destroy();
        this.mask = null;
      }

      if (this.parent) this.parent.sortableChildren = false;
    }
  }, {
    key: "__onUpdate",
    value: function __onUpdate() {
      this.cc = {
        top: undefined,
        right: undefined,
        bottom: undefined,
        left: undefined
      };

      if (this.textureData.crop) {
        this.mask = this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Graphics"]());
      }

      grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(this, this.textureData.size, this.textureData.skewX, this.textureData.skewY);
      this.anchor.set(0.5, 0.5);

      if (this.textureData.images.build) {
        this.parent.sortableChildren = true;
        this.addDerivate('build');
        this.derivates.build.texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_4__["Texture"])(this.textureData, 'build');
        this.derivates.build.type = 'build';
        this.derivates.build.zIndex = 1;
        this.parent.addChild(this.derivates.build);
        grid_Transform__WEBPACK_IMPORTED_MODULE_3__["Transform"].transform(this.derivates.build, this.textureData.size, false, false);
        this.derivates.build.anchor.set(.5, 1);
      } else {
        this.sortableChildren = true;
        this.destroyAllDerivates();
      }

      this.updateConnections();
    }
  }, {
    key: "__onUpdatePosition",
    value: function __onUpdatePosition() {
      this.updateConnections();
    }
  }, {
    key: "updateConnections",
    value: function updateConnections() {
      var tile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.tile;
      var selection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.selection;
      if (!tile) return;
      this.x = tile.x;
      this.y = tile.y;

      if (this.derivates.build) {
        this.derivates.build.x = tile.x;
        this.derivates.build.y = tile.y + grid_Tile__WEBPACK_IMPORTED_MODULE_5__["Tile"].halfHeight;
      }

      var connect = {
        top: false,
        bottom: false,
        left: false,
        right: false
      };
      selection.forEach(function (alt, i, a) {
        if (alt !== tile) {
          connect.top = connect.top || tile.cx === alt.cx && tile.cy === alt.cy + 1, connect.bottom = connect.bottom || tile.cx === alt.cx && tile.cy === alt.cy - 1, connect.left = connect.left || tile.cy === alt.cy && tile.cx === alt.cx + 1, connect.right = connect.right || tile.cy === alt.cy && tile.cx === alt.cx - 1;
        }
      });

      if (this.textureData.crop) {
        this.draw_mask(connect);
      } // HANDLE ROAD SPECIALS


      if (this.derivates.build) {
        this.surfaceOffset = this.textureData.orig.height - this.textureData.cutoff;
        var s,
            inverse,
            count = 0,
            texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_4__["Texture"])(this.textureData, 'build');

        for (s in connect) {
          if (connect[s]) count++;
        }

        if (count === 1) {
          for (s in connect) {
            inverse = {
              top: 'bottom',
              right: 'left',
              bottom: 'top',
              left: 'right'
            }[s];

            if (connect[s] && this.textureData.images['start_' + inverse]) {
              texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_4__["Texture"])(this.textureData, 'start_' + inverse);
              this.surfaceOffset = (this.textureData.orig.height - this.textureData.cutoff) * 0.5;
            }
          }
        }

        this.derivates.build.texture = texture; //console.log('Road.updateConnections', this.tile.toString(), this.surfaceOffset);
      }
    }
  }, {
    key: "draw_mask",
    value: function draw_mask(sides) {
      var requiresUpdate = sides.top !== this.cc.top || sides.right !== this.cc.right || sides.bottom !== this.cc.bottom || sides.left !== this.cc.left;

      if (requiresUpdate) {
        if (!this.mask) {
          console.warn('mask missing');
          return;
        } // CACHE


        this.cc = sides;
        var radius = this.texture.width * 0.33; // DRAW

        this.mask.clear();
        this.mask.beginFill(0xffff00, 1);
        this.mask.drawCircle(0, 0, radius);
        if (this.cc.top) this.mask.drawRect(-radius, -radius * 2, radius * 2, radius * 2);
        if (this.cc.right) this.mask.drawRect(0, -radius, radius * 2, radius * 2);
        if (this.cc.bottom) this.mask.drawRect(-radius, 0, radius * 2, radius * 2);
        if (this.cc.left) this.mask.drawRect(-radius * 2, -radius, radius * 2, radius * 2);
        this.mask.endFill();
      }
    }
  }], [{
    key: "recursiveConnect",
    value: function recursiveConnect(tile) {
      var array = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var rootNode = array.length === 0;

      if (array.indexOf(tile) === -1) {
        // PUSH START-TILE
        if (tile.content.contains('road')) {
          array.push(tile);
        } // CHECK MY NEIGHBOURS


        tile.neighbours().forEach(function (v, i, a) {
          if (v && v.content.contains('road')) {
            Road.recursiveConnect(v, array);
          }
        });
      }

      if (rootNode) {
        // CREATE ALL CONNECTIONS
        array.forEach(function (tile, index) {
          tile.content.getSprites('road').forEach(function (roadSprite) {
            roadSprite.updateConnections(tile, array);
          });
        });
      }
    }
  }]);

  return Road;
}(grid_types_Generic__WEBPACK_IMPORTED_MODULE_2__["Generic"]);

Object(HotModule_js__WEBPACK_IMPORTED_MODULE_6__["HotModule"])(module, Road);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/types/Surface.js":
/*!***************************************!*\
  !*** ./src/lib/grid/types/Surface.js ***!
  \***************************************/
/*! exports provided: Surface */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Surface", function() { return Surface; });
/* harmony import */ var pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! pixi.js */ "./node_modules/pixi.js/lib/pixi.es.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var grid_Tile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Tile */ "./src/lib/grid/Tile.js");
/* harmony import */ var grid_Texture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/Texture */ "./src/lib/grid/Texture.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var grid_types_Generic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grid/types/Generic */ "./src/lib/grid/types/Generic.js");
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var HotModule_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! HotModule.js */ "./HotModule.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }








var Surface =
/*#__PURE__*/
function (_Generic) {
  _inherits(Surface, _Generic);

  function Surface(sprite) {
    var _this;

    _classCallCheck(this, Surface);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Surface).call(this, sprite)); // PEPARE VARS

    _this.cc = {};
    _this.overlays = {};

    _this.on('enable', function (e) {
      _this.cc = {
        top: false,
        right: false,
        bottom: false,
        left: false
      }; // PREPARE SPRITES & MASKS

      for (var s in _this.cc) {
        _this.overlays[s] = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Sprite"]());
        _this.overlays[s].mask = _this.addChild(new pixi_js__WEBPACK_IMPORTED_MODULE_0__["Graphics"]());

        _this.overlays[s].anchor.set(0.5, 0.5);
      }
    });

    _this.on('disable', function (e) {
      for (var s in _this.cc) {
        if (_this.overlays[s]) {
          _this.overlays[s].destroy({
            children: true
          });

          delete _this.overlays[s];
        }
      }
    });

    _this.on('update', function (e) {
      grid_Transform__WEBPACK_IMPORTED_MODULE_6__["Transform"].transform(_assertThisInitialized(_this), _this.textureData.size, _this.textureData.skewX, _this.textureData.skewY);

      _this.anchor.set(0.5, 0.5);

      for (var s in _this.overlays) {
        _this.overlays[s].textureDataId = null;
      }
    });

    _this.on('update-position', function (e) {
      _this.x = _this.limits.x;
      _this.y = _this.limits.y;

      _this.updateConnections();
    });

    return _this;
  }

  _createClass(Surface, [{
    key: "updateConnections",
    value: function updateConnections() {
      var updateNeighbours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (!this.selection || this.selection.length === 0) return;
      var tile = this.selection[0],
          surfaceSize = 3,
          neighbours = {
        left: App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.getTile({
          x: tile.cx - surfaceSize,
          y: tile.cy
        }),
        right: App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.getTile({
          x: tile.cx + surfaceSize,
          y: tile.cy
        }),
        top: App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.getTile({
          x: tile.cx,
          y: tile.cy - surfaceSize
        }),
        bottom: App__WEBPACK_IMPORTED_MODULE_1__["App"].Grid.getTile({
          x: tile.cx,
          y: tile.cy + surfaceSize
        }) // GET APPROPRIATE TEXTURES

      };
      var neighbourDataNode, s; // UPDATE NEIGHBOURS ONLY

      if (updateNeighbours) {
        for (s in neighbours) {
          if (neighbours[s]) {
            neighbourDataNode = neighbours[s].content.getDataNodes('surface');

            if (neighbourDataNode.length === 1) {
              neighbours[s].content.getSprites('surface')[0].updateConnections();
            }
          }
        } // DONE


        return;
      } // UPDATE SELF


      for (s in neighbours) {
        if (neighbours[s]) {
          neighbourDataNode = neighbours[s].content.getDataNodes('surface');

          if (neighbourDataNode.length === 1 && this.overflows(neighbourDataNode[0].id, this.textureDataId)) {
            neighbours[s] = neighbourDataNode[0];
            /*if( neighbours[s].id === 'surface/water' && this.textureDataId === 'surface/dirt' && Math.random() < 0.25){
            	neighbours[s] = TextureData['surface/beach']
            }*/

            this.overlays[s].visible = true;
          } else {
            neighbours[s] = false;
            this.overlays[s].visible = false;
          }
        }
      } // CREATING MASKING


      for (s in neighbours) {
        if (neighbours[s]) {
          var requiresUpdate = this.overlays[s].textureDataId !== neighbours[s].id;

          if (requiresUpdate) {
            var textureData = interface_Interface__WEBPACK_IMPORTED_MODULE_4__["TextureData"][neighbours[s].id]; // SET SPITE TEXTURE

            this.overlays[s].textureDataId = neighbours[s].id;
            this.overlays[s].texture = Object(grid_Texture__WEBPACK_IMPORTED_MODULE_3__["Texture"])(textureData);
            this.drawMask(s, this.overlays[s].mask, this.overlays[s].texture.orig.width, textureData.size[0]);
          }
        }
      }
    }
  }, {
    key: "overflows",
    value: function overflows(from, to) {
      from = from.split('/')[1];
      to = to.split('/')[1]; // EXCEPTIONS

      if (from === 'water' && to === 'sand') return false;
      if (from === 'sand' && to === 'water') return true; // DEFAULT

      var order = ['water', 'grass', 'dirt', 'sand', 'stone'];
      return order.indexOf(from) < order.indexOf(to);
    }
  }, {
    key: "drawMask",
    value: function drawMask(side, graphics, size, span) {
      var i,
          offset = size * -0.5,
          minimumIndent = size * 0.05 / span,
          maximumIndent = size * 0.95 / span,
          segments = Math.floor(3 + Math.random() * 5),
          x = [offset, offset + 0],
          y = [offset, offset];

      for (i = 0; i < segments; i++) {
        x.push(minimumIndent + Math.random() * (maximumIndent - minimumIndent) + offset);
        y.push(minimumIndent + (size - minimumIndent * 2) * (i + 1) / (segments + 1) + offset);
      } // CLOSING THE POINTS


      x.push(0 + offset);
      y.push(size + offset);
      x.push(offset);
      y.push(size + offset); // CHANGE FOR SIDES

      for (i = 0; i < x.length; i++) {
        if (side === 'right') {
          x[i] = -x[i];
        }

        if (side === 'top' || side === 'bottom') {
          var _x = x[i];
          x[i] = y[i];
          y[i] = _x;
          if (side === 'bottom') y[i] = -y[i];
        }
      } // CALCULATE CONTROL POINTS


      var cpx = this.computeControlPoints(x),
          cpy = this.computeControlPoints(y); // DRAW WOBBLY SHAPE

      graphics.clear();
      graphics.beginFill(0xff0000, 1);
      graphics.moveTo(x[0], y[0]);

      for (i = 0; i < x.length - 1; i++) {
        if (i === 0 || i === x.length - 2) {
          graphics.lineTo(x[i + 1], y[i + 1]);
        } else {
          graphics.bezierCurveTo(cpx.p1[i], cpy.p1[i], cpx.p2[i], cpy.p2[i], x[i + 1], y[i + 1]);
        }
      }

      graphics.lineTo(x[0], y[0]);
      graphics.endFill();
    }
    /* ADAPTED FROM bezier-spline.js
     *
     * computes cubic bezier coefficients to generate a smooth
     * line through specified points. couples with SVG graphics 
     * for interactive processing.
     *
     * For more info see:
     * http://www.particleincell.com/2012/bezier-splines/ 
     *
     * Lubos Brieda, Particle In Cell Consulting LLC, 2012
     * you may freely use this algorithm in your codes however where feasible
     * please include a link/reference to the source article
     */

    /*computes control points given knots K, this is the brain of the operation*/

  }, {
    key: "computeControlPoints",
    value: function computeControlPoints(K) {
      var p1 = new Array(),
          p2 = new Array(),
          n = K.length - 1,
          i,
          m,

      /*rhs vector*/
      a = new Array(),
          b = new Array(),
          c = new Array(),
          r = new Array();
      /*left most segment*/

      a[0] = 0;
      b[0] = 2;
      c[0] = 1;
      r[0] = K[0] + 2 * K[1];
      /*internal segments*/

      for (i = 1; i < n - 1; i++) {
        a[i] = 1;
        b[i] = 4;
        c[i] = 1;
        r[i] = 4 * K[i] + 2 * K[i + 1];
      }
      /*right segment*/


      a[n - 1] = 2;
      b[n - 1] = 7;
      c[n - 1] = 0;
      r[n - 1] = 8 * K[n - 1] + K[n];
      /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/

      for (i = 1; i < n; i++) {
        m = a[i] / b[i - 1];
        b[i] = b[i] - m * c[i - 1];
        r[i] = r[i] - m * r[i - 1];
      }

      p1[n - 1] = r[n - 1] / b[n - 1];

      for (i = n - 2; i >= 0; --i) {
        p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];
      }
      /*we have p1, now compute p2*/


      for (i = 0; i < n - 1; i++) {
        p2[i] = 2 * K[i + 1] - p1[i + 1];
      }

      p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
      return {
        p1: p1,
        p2: p2
      };
    }
  }], [{
    key: "neighboursConnect",
    value: function neighboursConnect(tile) {
      var node = tile.content.getDataNodes('surface')[0],
          sprite = tile.content.getSprites('surface')[0]; //console.log(tile, node, sprite);

      sprite.updateConnections(true);
    }
  }]);

  return Surface;
}(grid_types_Generic__WEBPACK_IMPORTED_MODULE_5__["Generic"]);

Object(HotModule_js__WEBPACK_IMPORTED_MODULE_7__["HotModule"])(module, Surface);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/grid/types/Type.js":
/*!************************************!*\
  !*** ./src/lib/grid/types/Type.js ***!
  \************************************/
/*! exports provided: Generic, Surface, Road, Fence, Build, Kiwi */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var grid_types_Generic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! grid/types/Generic */ "./src/lib/grid/types/Generic.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Generic", function() { return grid_types_Generic__WEBPACK_IMPORTED_MODULE_0__["Generic"]; });

/* harmony import */ var grid_types_Surface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! grid/types/Surface */ "./src/lib/grid/types/Surface.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Surface", function() { return grid_types_Surface__WEBPACK_IMPORTED_MODULE_1__["Surface"]; });

/* harmony import */ var grid_types_Road__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/types/Road */ "./src/lib/grid/types/Road.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Road", function() { return grid_types_Road__WEBPACK_IMPORTED_MODULE_2__["Road"]; });

/* harmony import */ var grid_types_Fence__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! grid/types/Fence */ "./src/lib/grid/types/Fence.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Fence", function() { return grid_types_Fence__WEBPACK_IMPORTED_MODULE_3__["Fence"]; });

/* harmony import */ var grid_types_Build__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! grid/types/Build */ "./src/lib/grid/types/Build.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Build", function() { return grid_types_Build__WEBPACK_IMPORTED_MODULE_4__["Build"]; });

/* harmony import */ var grid_types_Kiwi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! grid/types/Kiwi */ "./src/lib/grid/types/Kiwi.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Kiwi", function() { return grid_types_Kiwi__WEBPACK_IMPORTED_MODULE_5__["Kiwi"]; });







var types = {
  surface: grid_types_Surface__WEBPACK_IMPORTED_MODULE_1__["Surface"],
  road: grid_types_Road__WEBPACK_IMPORTED_MODULE_2__["Road"],
  fence: grid_types_Fence__WEBPACK_IMPORTED_MODULE_3__["Fence"],
  build: grid_types_Build__WEBPACK_IMPORTED_MODULE_4__["Build"],
  kiwi: grid_types_Kiwi__WEBPACK_IMPORTED_MODULE_5__["Kiwi"]
};

grid_types_Generic__WEBPACK_IMPORTED_MODULE_0__["Generic"].create = function (type, textureDataId, selection) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var sprite; //console.log('Generic.create', type, '(',textureDataId, selection, index,')');

  if (types[type]) {
    sprite = new types[type]();
  } else {
    sprite = new grid_types_Generic__WEBPACK_IMPORTED_MODULE_0__["Generic"]();
  }

  sprite.on('added', function () {
    sprite.enabled = true;
    sprite.textureDataId = textureDataId;
    sprite.selection = selection;
    sprite.index = index;
    sprite.off('added');
  });
  return sprite;
};

grid_types_Generic__WEBPACK_IMPORTED_MODULE_0__["Generic"].destroy = function (sprite) {
  sprite.enabled = false;
  sprite.destroy({
    children: true
  });
};



/***/ }),

/***/ "./src/lib/interface/DataSheet.js":
/*!****************************************!*\
  !*** ./src/lib/interface/DataSheet.js ***!
  \****************************************/
/*! exports provided: DataSheet, DataSheetNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSheet", function() { return DataSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSheetNode", function() { return DataSheetNode; });
/* harmony import */ var interface_H__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! interface/H */ "./src/lib/interface/H.js");
/* harmony import */ var _DataSheet_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataSheet.scss */ "./src/lib/interface/DataSheet.scss");
/* harmony import */ var _DataSheet_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_DataSheet_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var DataSheetNode =
/*#__PURE__*/
function () {
  function DataSheetNode(target) {
    _classCallCheck(this, DataSheetNode);

    // STRING
    this.title = 'Title';
    this.root = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'node',
      target: target
    });
    this.img = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'img',
      target: this.root
    });
    this.p = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      tag: 'p',
      innerHTML: 'info',
      target: this.root
    });
  }

  _createClass(DataSheetNode, [{
    key: "getTransform",
    value: function getTransform(trim, orig) {
      var sx = trim.width * 100 / orig.width,
          sy = trim.height * 100 / orig.height;
      var px = trim.left * 100 / orig.width,
          // + (rx*100),
      py = trim.top * 100 / orig.height; // + (ry*100);

      var spx = (orig.width - trim.width) / orig.width;
      if (spx !== 0) px /= spx;
      var spy = (orig.height - trim.height) / orig.height;
      if (spy !== 0) py /= spy;
      var size = Math.round(sx) + '% ' + Math.round(sy) + '%';
      var position = Math.round(px) + '% ' + Math.round(py) + '%';
      return {
        size: size,
        position: position
      };
    }
  }, {
    key: "feed",
    value: function feed(content, backgroundUrl) {
      var _this = this;

      var data = interface_Interface__WEBPACK_IMPORTED_MODULE_4__["TextureData"][content.id]; //console.log('DataSheetNode.feed', data );

      this.title = data.id;
      this.p.innerHTML = data.description;
      this.p.scrollTop = 0;
      var skew = ['road/', 'surface/'].some(function (type) {
        return content.id.indexOf(type) !== -1;
      }),
          backgroundImage = '',
          backgroundSize = '',
          backgroundPosition = '',
          img;
      ['main', 'surface'].forEach(function (s) {
        img = data.images[s];

        if (img) {
          if (backgroundImage.length > 0) {
            backgroundImage += ', ';
            backgroundSize += ', ';
            backgroundPosition += ', ';
          }

          var transform = _this.getTransform(img.trim, data.orig);

          backgroundImage += 'url(' + img.url + ')';
          backgroundSize += transform.size;
          backgroundPosition += transform.position;
        }
      });

      if (interface_Interface__WEBPACK_IMPORTED_MODULE_4__["TextureData"][content.id].images.build) {
        backgroundImage = 'url(' + interface_Interface__WEBPACK_IMPORTED_MODULE_4__["TextureData"][content.id].images.build.url + ')';
        backgroundSize = 'contain';
        backgroundPosition = 'center';
      }

      backgroundImage += ', url(' + backgroundUrl + ')';
      backgroundSize += ', auto 100%';
      backgroundPosition += ', center';
      this.img.style.backgroundImage = backgroundImage;
      this.img.style.backgroundSize = backgroundSize;
      this.img.style.backgroundPosition = backgroundPosition;
      this.img.style.paddingBottom = Math.round((1 - data.orig.width / data.orig.height) * 50) + '%'; //console.log('//', backgroundImage,'//', backgroundSize,'//', backgroundPosition, data.orig.height/data.orig.width );
      //this.img.classList[skew?'add':'remove']('skew');
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.root.remove();
    }
  }]);

  return DataSheetNode;
}();

var DataSheet =
/*#__PURE__*/
function () {
  function DataSheet() {
    var _this2 = this;

    _classCallCheck(this, DataSheet);

    this.root = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'datasheet'
    });
    this.hide(); // TITLE

    this.title = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: this.root,
      class: 'title',
      innerHTML: 'datasheet',
      tag: 'h2'
    });
    this.btn_close = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: this.root,
      class: 'button',
      innerHTML: 'X',
      tag: 'button'
    });
    this.btn_close.addEventListener('click', function (e) {
      _this2.hide();
    });
    var dataHolderParent = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'menu',
      target: this.root
    });
    this.content = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'content',
      target: dataHolderParent
    });
    this.btn_prev = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: dataHolderParent,
      class: 'button',
      innerHTML: '<',
      tag: 'button'
    });
    this.btn_prev.addEventListener('click', function (e) {
      _this2.prev();
    });
    var info = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'info',
      target: dataHolderParent
    });
    this.btn_next = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: dataHolderParent,
      class: 'button',
      innerHTML: '>',
      tag: 'button'
    });
    this.btn_next.addEventListener('click', function (e) {
      _this2.next();
    });
    this.n = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: info,
      innerHTML: '0',
      tag: 'span'
    });
    this.c = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: info,
      innerHTML: '0',
      tag: 'span'
    });
    this.count = 0;
    this.nodes = [];
  }

  _createClass(DataSheet, [{
    key: "hide",
    value: function hide() {
      this.root.classList.add('hidden');
    }
  }, {
    key: "show",
    value: function show() {
      this.root.classList.remove('hidden');
    }
  }, {
    key: "updateDisplay",
    value: function updateDisplay() {
      var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.count;
      var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.length;
      this.count = count;
      this.length = length;

      for (var i = this.nodes.length - 1; i >= length; i--) {
        this.nodes.splice(i, 1)[0].destroy();
      }

      if (this.nodes.length > 0) {
        this.show();
      } else {
        this.hide();
        return;
      }

      this.n.innerHTML = count + 1;
      this.c.innerHTML = length;
      /*this.btn_next.style.display = (count < length-1 ) ? 'block' : 'none';
      this.btn_prev.style.display = (count > 0 ) ? 'block' : 'none';*/

      this.title.innerHTML = this.nodes[count].title;
      this.nodes.forEach(function (node, index) {
        node.root.style.left = (index - count) * 100 + '%';
      });
    }
  }, {
    key: "next",
    value: function next() {
      this.count = (this.count + 1) % this.length;
      this.updateDisplay();
    }
  }, {
    key: "prev",
    value: function prev() {
      this.count = (this.count - 1 + this.length) % this.length;
      this.updateDisplay();
    }
  }, {
    key: "tile",
    get: function get() {
      return this._tile;
    },
    set: function set(tile) {
      var _this3 = this;

      if (tile !== this._tile) {
        this._tile = tile;

        if (tile) {
          //console.log('DataSheet.showTileData', tile.toString(), tile.content.keys );
          // POSITION

          /*var p = Transform.c2p(tile.cx, tile.cy);
          p.x += App.Grid.x;
          p.y += App.Grid.y;
          console.log(p);
          		this.root.style.left = p.x + 'px';
          this.root.style.top  = p.y + 'px';*/
          // CONTENT
          var surface = tile.content.getDataNodes('surface/'); //console.log(surface, TextureData, TextureData[surface[0].id]);

          var nodes = tile.content.getDataNodes('^((?!surface/).)*$');
          nodes.forEach(function (node, index, array) {
            if (!_this3.nodes[index]) _this3.nodes[index] = new DataSheetNode(_this3.content);

            _this3.nodes[index].feed(node, interface_Interface__WEBPACK_IMPORTED_MODULE_4__["TextureData"][surface[0].id].images.main.url);
          });
          this.updateDisplay(nodes.length - 1, nodes.length);
        } else {
          this.hide();
        }
      } else if (tile) {
        this.updateDisplay();
      }
    }
  }]);

  return DataSheet;
}();



Object(HotModule__WEBPACK_IMPORTED_MODULE_5__["HotModule"])(module, DataSheet, DataSheetNode);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/interface/DataSheet.scss":
/*!******************************************!*\
  !*** ./src/lib/interface/DataSheet.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./DataSheet.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/DataSheet.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./DataSheet.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/DataSheet.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./DataSheet.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/DataSheet.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/lib/interface/H.js":
/*!********************************!*\
  !*** ./src/lib/interface/H.js ***!
  \********************************/
/*! exports provided: H */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "H", function() { return H; });
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
var H = {
  name: 'H',
  // CREATE ELEMENT
  ce: function ce() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var d = document.createElement(props.tag || 'div');
    if (props.tag) delete props.tag;

    for (var s in props) {
      if (['target', 'tag'].indexOf(s) !== 0) {
        if (typeof d[s] !== 'undefined') {
          d[s] = props[s];
        } else {
          d.setAttribute(s, props[s]);
        }
      }
    }

    (props.target ? props.target : document.body).appendChild(d);
    return d;
  }
};

Object(HotModule__WEBPACK_IMPORTED_MODULE_0__["HotModule"])(module, H);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/interface/Images.js":
/*!*************************************!*\
  !*** ./src/lib/interface/Images.js ***!
  \*************************************/
/*! exports provided: Images */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Images", function() { return Images; });
/* harmony import */ var _assets_img_destroy_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../assets/img/destroy.png */ "./src/assets/img/destroy.png");
/* harmony import */ var _assets_img_destroy_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_img_destroy_png__WEBPACK_IMPORTED_MODULE_0__);

/*import kiwi from '../../assets/img/kiwi.png';*/
//import background from '../../assets/img/background-texture.png';

var Images = {
  destroy: _assets_img_destroy_png__WEBPACK_IMPORTED_MODULE_0___default.a
  /*	kiwi:kiwi*/

};

/***/ }),

/***/ "./src/lib/interface/Interface.js":
/*!****************************************!*\
  !*** ./src/lib/interface/Interface.js ***!
  \****************************************/
/*! exports provided: Interface, TextureData, GhostTile, Images, Textures */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Interface", function() { return Interface; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextureData", function() { return TextureData; });
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var interface_DataSheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! interface/DataSheet */ "./src/lib/interface/DataSheet.js");
/* harmony import */ var interface_KiwiActionPanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! interface/KiwiActionPanel */ "./src/lib/interface/KiwiActionPanel.js");
/* harmony import */ var interface_H__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! interface/H */ "./src/lib/interface/H.js");
/* harmony import */ var _Interface_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Interface.scss */ "./src/lib/interface/Interface.scss");
/* harmony import */ var _Interface_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Interface_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../assets/img/textures/Textures.js */ "./src/assets/img/textures/Textures.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GhostTile", function() { return _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__["GhostTile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Textures", function() { return _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__["Textures"]; });

/* harmony import */ var Images__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! Images */ "./src/lib/interface/Images.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Images", function() { return Images__WEBPACK_IMPORTED_MODULE_6__["Images"]; });

/* harmony import */ var _HotModule_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../HotModule.js */ "./HotModule.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }







var TextureData = {};


var Interface =
/*#__PURE__*/
function () {
  function Interface() {
    var _this = this;

    _classCallCheck(this, Interface);

    App__WEBPACK_IMPORTED_MODULE_0__["App"].register(this); // DATASHEET

    this.dataSheet = new interface_DataSheet__WEBPACK_IMPORTED_MODULE_1__["DataSheet"](); // KIWI ACTION PANEL

    this.kiwiActionPanel = new interface_KiwiActionPanel__WEBPACK_IMPORTED_MODULE_2__["KiwiActionPanel"](); // INTERFACE		

    this.root = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
      class: 'interface'
    });
    this.root.addEventListener('click', function (e) {
      _this.deselect();
    }); // GRID-INTERACTION-MODES

    this.stampModes = ['road', 'surface', 'build', 'fence', 'kiwi'];
    this.gridModes = ['drag'].concat(this.stampModes).concat(['destroy-road', 'destroy-surface', 'destroy-build', 'destroy-fence', 'destroy-kiwi']);
    this.gridModesSelector = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
      target: this.root,
      tag: 'select',
      disabled: true
    });
    this.gridModes.forEach(function (value) {
      interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
        target: _this.gridModesSelector,
        value: value,
        innerHTML: value,
        tag: 'option'
      });
    }); // SCALE

    this.scales = [0.25, 0.33, 0.5, 0.75, 1, 1.25, 1.5, 2, 3];
    this.scalesSelector = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
      target: this.root,
      tag: 'select'
    });
    this.scalesSelector.addEventListener('change', function (e) {
      App__WEBPACK_IMPORTED_MODULE_0__["App"].Grid.updateScale(parseFloat(_this.scalesSelector.value, 10));
    });
    this.scales.forEach(function (value) {
      interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
        target: _this.scalesSelector,
        value: value,
        innerHTML: value,
        tag: 'option',
        selected: value === 1
      });
    }); // TEMP STORE

    this.store = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
      target: this.root,
      tag: 'button',
      innerHTML: 'store'
    });
    this.store.addEventListener('click', function (e) {
      App__WEBPACK_IMPORTED_MODULE_0__["App"].Grid.data.store();
    }); // TOGGLE GRID

    this.tg = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
      target: this.root,
      tag: 'button',
      innerHTML: 'toggle-grid'
    });
    this.tg.addEventListener('click', function (e) {
      App__WEBPACK_IMPORTED_MODULE_0__["App"].Grid.container.visible = !App__WEBPACK_IMPORTED_MODULE_0__["App"].Grid.container.visible;
    }); // TEXTURES

    for (var group in _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__["Textures"]) {
      // CREATE TEXTURE GROUP
      var g = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
        class: 'group',
        target: this.root
      });
      var t = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
        tag: 'h2',
        target: g,
        innerHTML: group
      });
      var c = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
        class: 'content',
        target: g
      });

      for (var image in _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__["Textures"][group]) {
        // GET OBJECT INFO
        var url = _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__["Textures"][group][image].images.main.url,
            id = group + '/' + image,
            title = id; // STORE ARBITRARY DATA

        TextureData[id] = _assets_img_textures_Textures_js__WEBPACK_IMPORTED_MODULE_5__["Textures"][group][image];
        TextureData[id].id = id; // CREATE TEXTURE BUTTON

        var b = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
          target: c,
          class: 'button',
          id: id,
          title: title
        });
        b.style.backgroundImage = 'url(' + url + ')';
        b.addEventListener('click', function (e) {
          _this.selected(e);
        });
      } // DESTROY


      var d = interface_H__WEBPACK_IMPORTED_MODULE_3__["H"].ce({
        target: c,
        class: 'button',
        id: 'destroy-' + group,
        title: 'detroy ' + group
      });
      d.style.backgroundImage = 'url(' + Images__WEBPACK_IMPORTED_MODULE_6__["Images"].destroy + ')';
      d.addEventListener('click', function (e) {
        _this.selected(e);
      });
    }
  } // SELECT TEXTURE


  _createClass(Interface, [{
    key: "selected",
    value: function selected(e) {
      // GETTER
      if (e === undefined) {
        return this.___selected;
      }

      if (this.___selected && this.___selected.element) {
        this.___selected.element.classList.remove('selected');
      } // STORE INTERFACE MODE


      if (e) {
        this.mode(e.currentTarget.id.split('/')[0]);
        e.currentTarget.classList.add('selected');
        e.stopImmediatePropagation();
      } else {
        this.mode(this.gridModes[0]);
      } // DESELECT && FALL BACK TO DEFAUT MODE


      if (this.stampModes.indexOf(this.mode()) === -1) {
        this.___selected = {
          element: e.currentTarget
        };
        App__WEBPACK_IMPORTED_MODULE_0__["App"].Grid.updateStamp(false);
        return;
      } // SELECT NEW


      this.___selected = Object.assign({
        element: e.currentTarget,
        id: e.currentTarget.id,
        size: [1, 1]
      }, TextureData[e.currentTarget.id]); // PROPAGATE TO STAMP TOOL

      App__WEBPACK_IMPORTED_MODULE_0__["App"].Grid.updateStamp(this.___selected);
      return this.___selected;
    }
  }, {
    key: "deselect",
    value: function deselect() {
      if (this.___selected) {
        console.log('Interface.deselect');
        this.selected(false);
      }
    } // GRIDMODE

  }, {
    key: "mode",
    value: function mode(_mode) {
      if (typeof _mode === 'string' && this.gridModesSelector.value !== _mode) {
        console.log('Interface.mode:', _mode);
        this.gridModesSelector.value = _mode;
      } else {
        return this.gridModesSelector.value;
      }
    }
  }, {
    key: "tile",
    get: function get() {
      return this._tile;
    },
    set: function set(tile) {
      if (tile && tile.kiwi) {
        this.kiwiActionPanel.kiwi = tile.kiwi;
      } else {
        this.kiwiActionPanel.kiwi = false;
      }

      this.dataSheet.tile = tile;
    }
  }]);

  return Interface;
}();


Object(_HotModule_js__WEBPACK_IMPORTED_MODULE_7__["HotModule"])(module, Interface);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/interface/Interface.scss":
/*!******************************************!*\
  !*** ./src/lib/interface/Interface.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./Interface.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/Interface.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./Interface.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/Interface.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./Interface.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/Interface.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/lib/interface/KiwiActionPanel.js":
/*!**********************************************!*\
  !*** ./src/lib/interface/KiwiActionPanel.js ***!
  \**********************************************/
/*! exports provided: KiwiActionPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KiwiActionPanel", function() { return KiwiActionPanel; });
/* harmony import */ var interface_H__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! interface/H */ "./src/lib/interface/H.js");
/* harmony import */ var _KiwiActionPanel_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./KiwiActionPanel.scss */ "./src/lib/interface/KiwiActionPanel.scss");
/* harmony import */ var _KiwiActionPanel_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_KiwiActionPanel_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var grid_Transform__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! grid/Transform */ "./src/lib/grid/Transform.js");
/* harmony import */ var App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! App */ "./src/lib/App.js");
/* harmony import */ var interface_Interface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! interface/Interface */ "./src/lib/interface/Interface.js");
/* harmony import */ var HotModule__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! HotModule */ "./HotModule.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var KiwiActionPanel =
/*#__PURE__*/
function () {
  function KiwiActionPanel() {
    var _this = this;

    _classCallCheck(this, KiwiActionPanel);

    this.root = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      class: 'action-panel hidden'
    }); // TITLE

    this.title = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: this.root,
      class: 'title',
      innerHTML: 'Kiwi Action Panel',
      tag: 'h2'
    });
    this.btn_close = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: this.root,
      class: 'button',
      innerHTML: 'X',
      tag: 'button'
    });
    this.btn_close.addEventListener('click', function (e) {
      _this.kiwi = false;
    });
    this.btn_moveRand = interface_H__WEBPACK_IMPORTED_MODULE_0__["H"].ce({
      target: this.root,
      innerHTML: 'move-rand',
      tag: 'button'
    });
    this.btn_moveRand.addEventListener('click', function (e) {
      _this.kiwi.move('rand');
    });
  }

  _createClass(KiwiActionPanel, [{
    key: "updateData",
    value: function updateData() {
      console.log(this.kiwi);
      this.kiwi.selected = true;
      this.title.innerHTML = this.kiwi.toString();
    }
  }, {
    key: "kiwi",
    get: function get() {
      return this._kiwi;
    },
    set: function set(kiwi) {
      if (this.kiwi) this.kiwi.selected = false;

      if (kiwi !== this._kiwi) {
        this._kiwi = kiwi;

        if (!kiwi) {
          this.root.classList.add('hidden');
        } else {
          this.root.classList.remove('hidden');
          this.updateData();
        }
      }
    }
  }]);

  return KiwiActionPanel;
}();

Object(HotModule__WEBPACK_IMPORTED_MODULE_5__["HotModule"])(module, KiwiActionPanel);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/lib/interface/KiwiActionPanel.scss":
/*!************************************************!*\
  !*** ./src/lib/interface/KiwiActionPanel.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./KiwiActionPanel.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/KiwiActionPanel.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./KiwiActionPanel.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/KiwiActionPanel.scss", function() {
		var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js??ref--5-1!../../../node_modules/sass-loader/lib/loader.js??ref--5-2!./KiwiActionPanel.scss */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/lib/loader.js?!./src/lib/interface/KiwiActionPanel.scss");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/lib/static/ResizeHandler.js":
/*!*****************************************!*\
  !*** ./src/lib/static/ResizeHandler.js ***!
  \*****************************************/
/*! exports provided: ResizeHandler */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResizeHandler", function() { return ResizeHandler; });
var ResizeHandler = {
  fn: [],
  context: [],
  init: true,

  set source(object) {
    this._source = object;

    if (this.init) {
      window.addEventListener('resize', _.debounce(function (e) {
        ResizeHandler.trigger();
      }, 200));
    }
  },

  add: function add(fn, context) {
    if (this.fn.indexOf(fn) === -1) {
      this.fn.push(fn);
      this.context.push(context);
    }
  },
  remove: function remove(fn) {
    var index = this.registry.indexOf(fn);

    if (index >= 0) {
      this.fn.splice(index, 1);
      this.context.splice(index, 1);
    }
  },
  trigger: function trigger() {
    if (!this.init) return;
    if (window.console) console.log('ResizeHandler.trigger', this._source);

    for (var i = 0; i < this.fn.length; i++) {
      this.fn[i].call(this.context[i], this._source);
    }
  }
};

/***/ })

/******/ });
//# sourceMappingURL=index.js.map