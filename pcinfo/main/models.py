from django.db import models

class PSUCalculation(models.Model):
    cpu_power = models.IntegerField(default=0)
    gpu_power = models.IntegerField(default=0)
    fans_count = models.IntegerField(default=0)
    storage_count = models.IntegerField(default=0)
    safety_margin = models.IntegerField(default=0)
    upgrade = models.BooleanField(default=False)
    result_power = models.IntegerField()

    class Meta:
        verbose_name = "Расчет БП"
        verbose_name_plural = "Расчеты БП"


class CPUchoose(models.Model):
    kernels = models.IntegerField(default=0)
    frequency = models.IntegerField(default=0)
    streams = models.IntegerField(default=0)
    brend = models.IntegerField(default=0)
    works = models.IntegerField(default=0)
    soket = models.IntegerField(default=0)
    result_cpu = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Выбор cpu"
        verbose_name_plural = "Выборы cpu"


class GPUchoose(models.Model):
    memory = models.IntegerField(default=0)
    frequency_2 = models.IntegerField(default=0)
    brend_2 = models.IntegerField(default=0)
    resolution = models.IntegerField(default=0)
    works_2 = models.IntegerField(default=0)
    port = models.IntegerField(default=0)
    result_gpu = models.CharField(max_length=255)

    class Meta:
        verbose_name = "Выбор gpu"
        verbose_name_plural = "Выборы gpu"