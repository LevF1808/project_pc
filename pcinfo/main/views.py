from django.shortcuts import render
from .models import PSUCalculation, CPUchoose, GPUchoose
import os
import joblib
from django.conf import settings
from .forms import PSUCalculatorForm, CPUchooseForm, GPUchooseForm

titles = {
    "archit": "КакУстроенПК | Архитектура",
    "hdd": "КакУстроенПК | Жесткий диск",
    "cpu": "КакУстроенПК | Процессор",
    "kvant_history": "КакУстроенПК | История создания",
    "kvant_machine": "КакУстроенПК | Квантовая машина",
    "machine_t": "КакУстроенПК | Машина Тьюринга",
    "oper": "КакУстроенПК | Оперативная память",
    "ssd": "КакУстроенПК | Твердотельный накопитель",
    "turing": "КакУстроенПК | Тьюринг",
    "gpu": "КакУстроенПК | Видеокарта",
    "index": "КакУстроенПК | Главная",
    "motherboard": "КакУстроенПК | Материснкая плата",
    "psu": "КакУстроенПК | Блок питания"
}

MODEL_PATH = os.path.join(settings.BASE_DIR, 'psu_model.pkg')


def psu(request):
    result = None
    if request.method == 'POST':
        form = PSUCalculatorForm(request.POST)
        if form.is_valid():
            cpu = form.cleaned_data['cpu_power']
            gpu = form.cleaned_data['gpu_power']
            fans = form.cleaned_data['fans_count']
            storage = form.cleaned_data['storage_count']
            margin = int(form.cleaned_data['safety_margin'])
            upgrade = 1 if form.cleaned_data['upgrade'] == 'yes' else 0

            if os.path.exists(MODEL_PATH):
                try:
                    model = joblib.load(MODEL_PATH)
                    prediction = model.predict([[cpu, gpu, fans, storage, margin, upgrade]])[0]
                    result = int(prediction)

                    PSUCalculation.objects.create(
                        cpu_power=cpu,
                        gpu_power=gpu,
                        fans_count=fans,
                        storage_count=storage,
                        safety_margin=margin,
                        upgrade=(upgrade == 1),
                        result_power=result
                    )
                except Exception as e:
                    result = f"Ошибка модели: {e}"
            else:
                result = "Файл модели не найден"
    else:
        form = PSUCalculatorForm()

    context = {
        **titles,
        'form': form,
        'result': result
    }

    return render(request, 'main/index_psu.html', context)


CPU_MODEL_PATH = os.path.join(settings.BASE_DIR, 'cpu_model.pkg')
CPU_ENCODER_PATH = os.path.join(settings.BASE_DIR, 'cpu_encoder.pkg')


def cpu(request):
    result = None
    if request.method == 'POST':
        form = CPUchooseForm(request.POST)
        if form.is_valid():
            kernels = form.cleaned_data['kernels']
            frequency = form.cleaned_data['frequency']
            streams = form.cleaned_data['streams']
            brend = int(form.cleaned_data['brend'])
            soket = int(form.cleaned_data['soket'])
            works = int(form.cleaned_data['works'])

            if os.path.exists(CPU_MODEL_PATH) and os.path.exists(CPU_ENCODER_PATH):
                try:
                    model = joblib.load(CPU_MODEL_PATH)
                    encoder = joblib.load(CPU_ENCODER_PATH)
                    prediction_id = model.predict([[brend, streams, frequency, kernels, works, soket]])
                    result = encoder.inverse_transform(prediction_id)[0]

                    CPUchoose.objects.create(
                        brend=brend, streams=streams, result_cpu=result,
                        frequency=frequency, kernels=kernels, works=works,
                        soket=soket,
                    )
                except Exception as e:
                    result = f"Ошибка: {e}"
            else:
                result = "Файл модели не найден"
    else:
        form = CPUchooseForm()

    context_2 = {
        **titles,
        'form': form,
        'result': result,
        'kesh': titles['cpu']
    }
    return render(request, 'main/index_cpu.html', context_2)


GPU_MODEL_PATH = os.path.join(settings.BASE_DIR, 'gpu_model.pkg')
GPU_ENCODER_PATH = os.path.join(settings.BASE_DIR, 'gpu_encoder.pkg')


def gpu(request):
    result = None
    if request.method == 'POST':
        form = GPUchooseForm(request.POST)
        if form.is_valid():
            memory = form.cleaned_data['memory']
            frequency_2 = form.cleaned_data['frequency_2']
            resolution = form.cleaned_data['resolution']
            brend_2 = int(form.cleaned_data['brend_2'])
            port = int(form.cleaned_data['port'])
            works_2 = int(form.cleaned_data['works_2'])

            if os.path.exists(GPU_MODEL_PATH) and os.path.exists(GPU_ENCODER_PATH):
                try:
                    model = joblib.load(GPU_MODEL_PATH)
                    encoder = joblib.load(GPU_ENCODER_PATH)
                    prediction_id = model.predict([[brend_2, resolution, frequency_2, memory, works_2, port]])
                    result = encoder.inverse_transform(prediction_id)[0]

                    GPUchoose.objects.create(
                        brend_2=brend_2, resolution=resolution, result_gpu=result,
                        frequency_2=frequency_2, memory=memory, works_2=works_2,
                        port=port,
                    )
                except Exception as e:
                    result = f"Ошибка: {e}"
            else:
                result = "Файл модели не найден"
    else:
        form = GPUchooseForm()

    context_3 = {
        **titles,
        'form': form,
        'result': result,
        'kesh': titles['gpu']
    }
    return render(request, 'main/index_gpu.html', context_3)


def index(request):
    return render(request, 'main/index.html', titles)


def archit(request):
    return render(request, 'main/index_archit.html', titles)


def motherboard(request):
    return render(request, 'main/index_motherboard.html', titles)


def oper(request):
    return render(request, 'main/index_oper.html', titles)


def hdd(request):
    return render(request, 'main/index_hdd.html', titles)


def ssd(request):
    return render(request, 'main/index_ssd.html', titles)


def turing(request):
    return render(request, 'main/index_turing.html', titles)


def machine(request):
    return render(request, 'main/index_machine_t.html', titles)


def kvant_history(request):
    return render(request, 'main/index_kvant_history.html', titles)


def kvant_machine(request):
    return render(request, 'main/index_kvant_machine.html', titles)