class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = MockResizeObserver as any;

if (typeof Element !== "undefined") {
  Element.prototype.scrollIntoView = () => {};
}
