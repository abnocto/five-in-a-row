declare module 'ip' {
	const address: () => string;
}

declare module '*.vue' {
	const SFC: Vue.Component;
	export default SFC;
}

declare const api: import('../types/api').Api;
