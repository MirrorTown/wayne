package deploy

const (
	RELEASEBEGIN = "\t\t----发布单[%s容器]---- \n\n" +
		"| 发布状态: %v \n" +
		"| 发布应用: %v \n" +
		"| 发布人: %v \n" +
		"| 发布时长: %vs \n" +
		"| 发布时间: %v"

	RESTARTWARN = "\t\t----重启警告---- \n\n" +
		"| 运行状态: %v \n" +
		"| 应用名: %v \n" +
		"| 重启次数: %v次 \n" +
		"| 告警时间: %v"
)

const (
	GRAY = "灰度"
	PROD = "正式"
)
