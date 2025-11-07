package cache

import "sync"

var (
	mem  = make(map[string]string)
	lock sync.RWMutex
)

func Get(k string) string {
	lock.RLock()
	defer lock.RUnlock()
	return mem[k]
}

func Set(k, v string) {
	lock.Lock()
	defer lock.Unlock()
	mem[k] = v
}
