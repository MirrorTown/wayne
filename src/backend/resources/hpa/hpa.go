package hpa

import (
	autoscaling "k8s.io/api/autoscaling/v1"
	autoscalingV2 "k8s.io/api/autoscaling/v2beta2"
	"k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/client-go/kubernetes"
)

func CreateOrUpdateHPA(c *kubernetes.Clientset, hpa *autoscaling.HorizontalPodAutoscaler) (*HPA, error) {
	old, err := c.AutoscalingV1().HorizontalPodAutoscalers(hpa.Namespace).Get(hpa.Name, v1.GetOptions{})
	if err != nil {
		if errors.IsNotFound(err) {
			kubeHPA, err := c.AutoscalingV1().HorizontalPodAutoscalers(hpa.Namespace).Create(hpa)
			if err != nil {
				return nil, err
			}
			return toHPA(kubeHPA), nil
		}
		return nil, err
	}
	hpa.Spec.DeepCopyInto(&old.Spec)
	kubeHPA, err := c.AutoscalingV1().HorizontalPodAutoscalers(hpa.Namespace).Update(old)
	if err != nil {
		return nil, err
	}
	return toHPA(kubeHPA), nil
}

func CreateOrUpdateHPAV2(c *kubernetes.Clientset, hpaV2 *autoscalingV2.HorizontalPodAutoscaler) (*HPAV2, error) {
	old, err := c.AutoscalingV2beta2().HorizontalPodAutoscalers(hpaV2.Namespace).Get(hpaV2.Name, v1.GetOptions{})
	if err != nil {
		if errors.IsNotFound(err) {
			kubeHPAV2, err := c.AutoscalingV2beta2().HorizontalPodAutoscalers(hpaV2.Namespace).Create(hpaV2)
			if err != nil {
				return nil, err
			}
			return toHPAV2(kubeHPAV2), nil
		}
		return nil, err
	}
	hpaV2.Spec.DeepCopyInto(&old.Spec)
	kubeHPAV2, err := c.AutoscalingV2beta2().HorizontalPodAutoscalers(hpaV2.Namespace).Create(old)
	if err != nil {
		return nil, err
	}
	return toHPAV2(kubeHPAV2), nil
}
