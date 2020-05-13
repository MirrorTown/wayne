package hpa

import (
	autoscaling "k8s.io/api/autoscaling/v1"
	autoscalingV2 "k8s.io/api/autoscaling/v2beta2"

	"github.com/Qihoo360/wayne/src/backend/resources/common"
)

type HPA struct {
	common.ObjectMeta `json:"objectMeta"`
	common.TypeMeta   `json:"typeMeta"`
	//ScaleTargetRef                  ScaleTargetRef `json:"scaleTargetRef"`
	MinReplicas                     *int32 `json:"minReplicas"`
	MaxReplicas                     int32  `json:"maxReplicas"`
	CurrentCPUUtilizationPercentage *int32 `json:"currentCPUUtilizationPercentage"`
	TargetCPUUtilizationPercentage  *int32 `json:"targetCPUUtilizationPercentage"`
}

func toHPA(hpa *autoscaling.HorizontalPodAutoscaler) *HPA {
	modelHPA := HPA{
		ObjectMeta: common.NewObjectMeta(hpa.ObjectMeta),
		TypeMeta:   common.NewTypeMeta("HorizontalPodAutoscaler"),

		MinReplicas:                     hpa.Spec.MinReplicas,
		MaxReplicas:                     hpa.Spec.MaxReplicas,
		CurrentCPUUtilizationPercentage: hpa.Status.CurrentCPUUtilizationPercentage,
		TargetCPUUtilizationPercentage:  hpa.Spec.TargetCPUUtilizationPercentage,
	}
	return &modelHPA
}

type HPAV2 struct {
	common.ObjectMeta `json:"objectMeta"`
	common.TypeMeta   `json:"typeMeta"`
	//ScaleTargetRef	ScaleTargetRef `json:"scaleTargetRef"`

	MinReplicas                     *int32 `json:"minReplicas"`
	MaxReplicas                     int32  `json:"maxReplicas"`
	CurrentCPUUtilizationPercentage *int32 `json:"currentCPUUtilizationPercentage"`
	TargetCPUUtilizationPercentage  *int32 `json:"targetCPUUtilizationPercentage"`
	CurrentMEMAverageValue          *int32 `json:"currentMEMAverageValue"`
	TargetMEMAverageValue           *int32 `json:"targetMEMAverageValue"`
}

func toHPAV2(hpaV2 *autoscalingV2.HorizontalPodAutoscaler) *HPAV2 {
	modelHPAV2 := HPAV2{
		ObjectMeta: common.NewObjectMeta(hpaV2.ObjectMeta),
		TypeMeta:   common.NewTypeMeta("HorizontalPodAutoscaler"),

		MinReplicas: hpaV2.Spec.MinReplicas,
		MaxReplicas: hpaV2.Spec.MaxReplicas,

		//CurrentCPUUtilizationPercentage: hpaV2.Status.CurrentMetrics,
		//TargetCPUUtilizationPercentage:  hpaV2.Spec.TargetCPUUtilizationPercentage,
		//CurrentMEMAverageValue:          nil,
		//TargetMEMAverageValue:           nil,
	}

	return &modelHPAV2
}
